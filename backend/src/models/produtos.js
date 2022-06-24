module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("produtos", {
      nome: {
        type: Sequelize.STRING
      },   
      preco: {
        type: Sequelize.DOUBLE
      },               
      fator_conversao: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.INTEGER
      }
    });
    return Table;
  };