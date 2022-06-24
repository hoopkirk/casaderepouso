const db = require("../models");
const Table = db.usuarios;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

var fetch = require('node-fetch');

// const Authorization = req.headers.authorization
// if (!Authorization) {
//     return res.json({ message: 'Invalid Authorization token' }, 401)
// }

// const accessToken = Authorization.split(' ')[1]
// const { string } = jwt.verify(accessToken, process.env.JWT_SECRET)

exports.create = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
        return;
    }

    console.log(req.body)

    const obj = {
        nome: req.body.name,
        usuario: req.body.email,
        senha: req.body.password,
        nivel: 'normal',
        status: 1
    };

    Table.count({ where: { usuario: req.body.email } }).then(function (count) {
        if (count != 0) {
            res.status(400).send({
                message: "Já existe usuário com esse email!"
            });
        } else {
            Table.create(obj)
                .then(data => {
                    console.log(data.dataValues)
                    const accessToken = jwt.sign({ userId: data.dataValues.id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_VALIDITY,
                    })
                    res.send({ accessToken, user: data.dataValues });
                })
                .catch(err => {
                    res.status(400).send({
                        message:
                            err.message || "Ocorreu algum erro ao criar registro."
                    });
                });
        }
    })
};

exports.login = (req, res) => {
    Table.findAll({ where: { usuario: req.body.email, senha: req.body.password } })
        .then(data => {
            if (data.length) {
                console.log(data[0].dataValues)
                const accessToken = jwt.sign({ userId: data[0].dataValues.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_VALIDITY,
                })
                res.send({ accessToken, user: data[0].dataValues });
            } else {
                res.send({ message: 'Usuário ou senha incorretos' });
            }

        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Ocorreu algum erro ao criar registro."
            });
        });
};

exports.check = (req, res) => {

    try {
        const Authorization = req.headers.authorization
        if (!Authorization) {
            return res.json({ message: 'Invalid Authorization token' }, 201)
        }

        const accessToken = Authorization.split(' ')[1]
        const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET)

        return res.json({ message: 'Authorization', status: true }, 200)
    } catch (err) {
        console.log(err.message)
        res.json({ message: err.message }, 201);
    }
}

// Recupere todos do banco de dados.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Table.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao recuperar dados."
            });
        });
};

// Get ID
exports.findOne = (req, res) => {
    // const id = req.params.id;

    const Authorization = req.headers.authorization
    if (!Authorization) {
        return res.json({ message: 'Invalid Authorization token' }, 201)
    }

    const accessToken = Authorization.split(' ')[1]
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET)

    Table.findByPk(userId)
        .then(data => {
            if (data) {
                data.appkey = ''
                data.senha = ''
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não é possível encontrar o id=${userId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Erro ao recuperar o id=${id}`
            });
        });
};

// Update ID
exports.update = (req, res) => {
    // const id = req.params.id;

    const Authorization = req.headers.authorization
    if (!Authorization) {
        return res.json({ message: 'Invalid Authorization token' }, 201)
    }

    const accessToken = Authorization.split(' ')[1]
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET)

    Table.update(req.body, {
        where: { id: userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Registro alterado.",
                    success: true
                });
            } else {
                res.send({
                    message: `Não foi possível alterar o registro id=${userId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar o id =" + userId
            });
        });
};

// Delete ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Table.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dado excluído com sucesso!",
                    status: 200
                });
            } else {
                res.send({
                    message: `Não é possível excluir o id=${id}. Talvez o id não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível excluir o id=" + id
            });
        });
};

// Delete all.
exports.deleteAll = (req, res) => {
    Table.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Dado(s) excluído(s) com sucesso!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao remover todos os dados."
            });
        });
};

// Get com filtro
exports.findAllAtivos = (req, res) => {
    Table.findAll({ where: { ativo: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao recuperar os dados."
            });
        });
};
