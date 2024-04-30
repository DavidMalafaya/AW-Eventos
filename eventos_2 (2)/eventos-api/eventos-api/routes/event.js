const eventRouter = require('express').Router();
const controller = require('../controllers/event');
const authMiddleware = require('../middlewares/auth');

eventRouter.use(authMiddleware);
eventRouter.get('/', controller.getAllEvents);
eventRouter.get('/:id', controller.getEventByID);
eventRouter.post('/', controller.createEvent);
eventRouter.put('/:id', controller.updateEvent);
eventRouter.delete('/:id', controller.deleteEvent);

module.exports = eventRouter;