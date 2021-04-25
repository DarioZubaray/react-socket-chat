/*
    path: api/v1/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { historyChat } = require('../controllers/message');

const router = Router();

router.get('/:destinationId', validateJWT, historyChat);

module.exports = router;
