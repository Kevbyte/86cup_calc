var racerController = require('../racers/racerController');
var eventController = require('../events/eventController');
var standingsController = require('../standings/standingsController');

var path = require('path');

module.exports = function (app) {
  // app.post('/totals', racerController.updateTotals);
  app.get('/racers/racerList', racerController.racerList);
  app.get('/racers/modList', racerController.getModList);
  app.get('/racers/otherModList', racerController.getOtherModList);
  app.post('/racers/updateRacerTotals', racerController.updateRacerTotals);
  app.post('/racers/updateModListAndPts', racerController.updateModListAndPts);
  app.post('/racers/deleteUsers', racerController.deleteUsers);
  app.post('/standings/archiveStandings', standingsController.archiveStandings);
  app.get('/standings/getArchive', standingsController.getArchive);
  app.post('/standings/deleteArchive', standingsController.deleteArchive);

  app.post('/events/addTrackEvent', eventController.addTrackEvent);
  app.get('/events/getEvents', eventController.getEvents);
  app.get('/events/getStats', eventController.getStats);
  app.post('/events/deleteTrackEvents', eventController.deleteTrackEvents);

  app.post('/auth/signup', racerController.signup);
  app.post('/auth/login', racerController.login);
  app.get('/auth/loggedin', racerController.checkAuth);
  app.post('/auth/logout', racerController.logout);
};
