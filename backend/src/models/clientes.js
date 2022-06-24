module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("clientes", {
    nome: {
      type: Sequelize.STRING
    },
    cpf: {
      type: Sequelize.STRING
    },
    logradouro: {
      type: Sequelize.STRING
    },
    complemento: {
      type: Sequelize.STRING
    },
    numero: {
      type: Sequelize.STRING
    },
    telefone: {
      type: Sequelize.STRING
    },    
    cidade: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    }
  });
  return Table;
};