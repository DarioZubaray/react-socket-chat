/*
    path: api/v1/login
*/
const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

// Register
router.post( '/new', [
    check('name', 'name is mandatory').not().isEmpty(),
    check('password', 'password is mandatory').not().isEmpty(),
    check('email', 'email is mandatory').isEmail(),
    validateFields
], createUser );

// Login
router.post('/',[
    check('email', 'email is mandatory').isEmail(),
    check('password', 'password is mandatory').not().isEmpty(),
    validateFields
], login );

// Renew Token
router.get('/renew', validateJWT, renewToken );

module.exports = router;
