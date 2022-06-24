module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("users", {
      nome: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      nivel: {
        type: Sequelize.STRING
      },      
      status: {
        type: Sequelize.INTEGER
      }
    });
    return Table;
  };