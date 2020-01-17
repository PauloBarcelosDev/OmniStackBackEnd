const { Router } = require('express');
const DevController = require('./controller/DevController');
const SeachController = require('./controller/SearchControllers');
const routes =  Router();

routes.get('/devs',DevController.index);
routes.post('/devs',DevController.store);
routes.put('/devs/:id',DevController.update);

routes.get('/search',SeachController.index);

module.exports = routes;