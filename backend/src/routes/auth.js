const { Router } = require('express');
const router = Router();

const { login, getProfile } = require('../controllers/auth.controller');

router.route('/login')
    .get(login)
    .options(login)
    .post(login);


router.route('/profile')
    .get(getProfile);

module.exports = router;