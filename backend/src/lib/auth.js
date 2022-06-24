
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

module.exports = {
    checkAuthentication (req, res, next) {
        z
        if (req.isAuthenticated()) {
            console.log("autenticado");
            return next();
        }
        console.log("não autenticado");
        return res.json({status:"no session"});
    },
    verifyJWT (req, res, next) {
      const token = req.headers['x-access-token'];
      if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
      
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
      });
  }
};
