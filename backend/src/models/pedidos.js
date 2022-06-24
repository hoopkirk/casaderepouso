module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("pedidos", {
      // ped_id: {
      //   type: Sequelize.INTEGER
      // },       
      cli_id: {
        type: Sequelize.INTEGER
      },             
      vlr_total: {
        type: Sequelize.DOUBLE
      }, 
      desconto: {
        type: Sequelize.DOUBLE
      },                     
      dta_cadastro: {
        type: Sequelize.DATE
      },
      pago: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      }      
    });
    return Table;
  };