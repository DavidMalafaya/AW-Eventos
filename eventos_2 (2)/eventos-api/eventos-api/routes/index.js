const router = require('express').Router();
const authRouter = require('./auth');
const eventRouter = require('./event');

router.use('/auth', authRouter);
router.use('/events', eventRouter);

module.exports = router;