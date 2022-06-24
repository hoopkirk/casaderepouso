const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//database
const pool = require('../db/database');

//helpers
const helpers = require('./helpers');

//local strategy to sign in
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {


  console.log(username)
  console.log(password)

  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {

        req.login(user, function(err){
            if(err){
                return done(null, false, 'something was wrong!');
            }
            return done(null, user, 'Welcome ' + user.username);
        })
        
      
    } else {
      return done(null, false, 'Incorrect Password');
    }
  } else {

    return done(null, false, 'The Username does not exists.');
  }
}));

//local strategy to sign up
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length > 0) {
    return done(null, false, 'User already exists');
  }

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  //Salvando no banco de dados
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

//definir sessão de usuário
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deletar sessão de usuário
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

