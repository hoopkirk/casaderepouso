const express = require('express');
const morgan = require('morgan');
const { verifyJWT } = require('./lib/auth');
const bodyParser = require('body-parser');
var cors = require('cors')
// const { bot } = require('./thread/bot');

const app = express();
app.use(cors())
app.use(bodyParser({ limit: '50mb' }))

const db = require("./models");

db.sequelize.sync({ alter: true }).then(() => {
    // force: true
    console.log("Banco de dados sincronizados");
});

app.set('port', 8080);

app.use(morgan('dev')); //para ver os pedidos no console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

require("./routes/clientes.routes")(app);
require("./routes/produtos.routes")(app);
require("./routes/users.routes")(app);
require("./routes/pedidos.routes")(app);
// require("./routes/emitentes.routes")(app);
// require("./routes/natureza_operacoes.routes")(app);
// require("./routes/accounts.routes")(app);

app.get('*', function (req, res) {
    res.send({ message: "Link da API não existe" }, 404);
});

const server = app.listen(app.get('port'), () => {
    console.log(`Servidor na porta: ${app.get('port')}`);
});

var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", function (socket) {
    // console.log(socket);
    socket.on("atualizarAll", function (data) {
        console.log(data)
        io.emit("atualizar", true);
    });
});

// app.use(express.static(path.join(__dirname, 'public')))
// bot();

module.exports = app;