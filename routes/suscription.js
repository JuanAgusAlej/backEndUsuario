const { Router } = require('express');
const subscribeGet = require('../controllers/subscribe.controller');
const { subscribe } = require('./usuarios');
const router = new Router();

router.get('/:email', subscribeGet);

module.exports = router;
