const db = require("../models");
const Table = db.pedidos;
const Table_pedidos_itens = db.pedidos_itens;
const Table_clientes = db.clientes;
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
    // console.log(req.body)
    if (!req.body.cli_id || !req.body.prod.length || !req.body.vlr_total) {
        res.status(201).send({ message: "O conteúdo não pode estar vazio!" });
        return;
    }


    let = jsonCapa = {
        cli_id: req.body.cli_id,
        desconto: 0,
        dta_cadastro: new Date(),
        pago: req.body.pago,
        status: 1,
        vlr_total: req.body.vlr_total
    }
    console.log(jsonCapa)


    Table.create(jsonCapa)
        .then(data => {
            req.body.prod.forEach(element => {

                let jsonItens = {
                    ped_id: data.dataValues.id,
                    cli_id: data.dataValues.cli_id,
                    prod_id: element.id,
                    preco: element.preco,
                    status: 1
                }

                Table_pedidos_itens.create(jsonItens)
                    .then(data => {
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Ocorreu algum erro ao criar registro."
                        });
                    });

            });
            res.status(200).send({ message: "Registrado com sucesso!", data, success: true });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao criar registro."
            });
        });

};

// Recupere todos do banco de dados.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    db.sequelize.query(`
            SELECT 
            p.*,
            c.nome,
            c.cpf

            FROM pedidos p 
        inner join clientes c on c.id = p.cli_id     
    `).then(results => {
        // console.log(results);
        res.send(results);
    });
};

exports.getValores = (req, res) => {

    if (!req.body.mes || !req.body.ano) {
        res.status(201).send({ message: "O conteúdo não pode estar vazio!" });
        return;
    }

    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    db.sequelize.query(`
        select 
            (select sum(p.vlr_total) from pedidos p where p.pago = 1 and extract(month from p.dta_cadastro) = ${req.body.mes} and extract(year from p.dta_cadastro) = ${req.body.ano}) recebido,
            (select sum(p.vlr_total) from pedidos p where p.pago = 0 and extract(month from p.dta_cadastro) = ${req.body.mes} and extract(year from p.dta_cadastro) = ${req.body.ano}) a_receber
        from dual  
    `).then(results => {
        // console.log(results);
        res.send(results);
    });
};

// Get ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.sequelize.query(`
    SELECT 
        p.*,
        c.nome,
        c.cpf,
        prod.nome prod_nome,
        i.*

        FROM pedidos p 
    inner join pedidos_itens i on i.ped_id  = p.id 
    inner join clientes c on c.id = p.cli_id
    inner join produtos prod on prod.id = i.prod_id 
    and p.id = ${id}     
    `).then(results => {
        if (results[0]) {
            res.send(results[0]);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o id=${id}.`
            });
        }
    });
    // Table.findByPk(id)
    //     .then(data => {
    //         if (data) {
    //             res.send(data);
    //         } else {
    //             res.status(404).send({
    //                 message: `Não é possível encontrar o id=${id}.`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: `Erro ao recuperar o id=${id}`
    //         });
    //     });
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

