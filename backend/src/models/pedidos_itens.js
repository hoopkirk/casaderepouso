module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("pedidos_itens", {
      ped_id: {
        type: Sequelize.INTEGER
      },       
      cli_id: {
        type: Sequelize.INTEGER
      },    
      prod_id: {
        type: Sequelize.INTEGER
      },             
      preco: {
        type: Sequelize.DOUBLE
      }, 
      status: {
        type: Sequelize.INTEGER
      }      
    });
    return Table;
  };