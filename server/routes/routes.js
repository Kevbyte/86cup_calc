var racerController = require('../racers/racerController');
var eventController = require('../events/eventController');

var path = require('path');

module.exports = function (app) {
  // app.post('/totals', racerController.updateTotals);
  app.get('/racers/racerList', racerController.racerList);
  app.get('/racers/modList', racerController.getModList);
  app.post('/racers/updateRacerTotals', racerController.updateRacerTotals);
  app.post('/racers/updateModListAndPts', racerController.updateModListAndPts);

  app.post('/events/addTrackEvent', eventController.addTrackEvent);

  app.post('/auth/signup', racerController.signup);
  app.post('/auth/login', racerController.login);
  app.get('/auth/loggedin', racerController.checkAuth);
  app.post('/auth/logout', racerController.logout);
};
