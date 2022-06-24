const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.usuarios = require("./users.js")(sequelize, Sequelize);
db.produtos = require("./produtos.js")(sequelize, Sequelize);
db.clientes = require("./clientes.js")(sequelize, Sequelize);
db.pedidos = require("./pedidos.js")(sequelize, Sequelize);
db.pedidos_itens = require("./pedidos_itens.js")(sequelize, Sequelize);
// db.cidades = require("./cidades.js")(sequelize, Sequelize);
// db.emitentes = require("./emitentes.js")(sequelize, Sequelize);
// db.natureza_operacoes = require("./natureza_operacoes.js")(sequelize, Sequelize);
// db.entradas = require("./entradas.js")(sequelize, Sequelize);
// db.accounts = require("./accounts.js")(sequelize, Sequelize);

module.exports = db;