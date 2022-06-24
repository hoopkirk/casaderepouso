const db = require("../models");
const Table = db.produtos;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

// const Authorization = req.headers.authorization
// if (!Authorization) {
//     return res.json({ message: 'Invalid Authorization token' }, 401)
// }

// const accessToken = Authorization.split(' ')[1]
// const { string } = jwt.verify(accessToken, process.env.JWT_SECRET)

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.nome || !req.body.fator_conversao || !req.body.preco) {
        res.status(201).send({ message: "O conteúdo não pode estar vazio!" });
        return;
    }

    const obj = {
        nome: req.body.nome,
        fator_conversao: req.body.fator_conversao,
        preco: req.body.preco,
        status: 1
    };

    Table.count({ where: { nome: req.body.nome } }).then(function (count) {
        if (count != 0) {
            res.status(200).send({
                message: "Já existe um produto com este nome!"
            });
        } else {
            Table.create(obj)
                .then(data => {
                    res.status(200).send({ message: "Registrado com sucesso!", data, success: 200 });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Ocorreu algum erro ao criar registro."
                    });
                });
        }
    })
};

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
    const id = req.params.id;

    Table.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não é possível encontrar o id=${id}.`
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
    const id = req.params.id;

    Table.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Registro alterado.",
                    success: true
                });
            } else {
                res.send({
                    message: `Não foi possível alterar o registro id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar o id =" + id
            });
        });
};

// Delete ID
exports.delete = (req, res) => {
    const id = req.params.id;

    db.sequelize.query(`
    select count(i.prod_id) qtd from pedidos_itens i  where i.prod_id = ${id}
    `).then(results => {
        if (results[0][0].qtd == 0) {
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
        }else{
            res.send({
                message: `Não é possível excluir. Já existe pedidos com este produto!`
            });
        }
        console.log(results);
    });


};

