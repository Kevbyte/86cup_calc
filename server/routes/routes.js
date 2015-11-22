var racerController = require('../racers/racerController');
var eventController = require('../events/eventController');
var standingsController = require('../standings/standingsController');

var path = require('path');

var isLoggedIn = function(req, res) {
  return !!req.session.user;
};

var checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    console.log('not logged in', req.session)
    res.redirect('/#/login');
  } else {
    console.log('checkuser')
    next();
  }
};

module.exports = function (app) {
  // app.post('/totals', racerController.updateTotals);
  app.get('/racers/racerList', checkUser, racerController.racerList);
  app.get('/racers/modList', checkUser, racerController.getModList);
  app.get('/racers/otherModList', racerController.getOtherModList);
  app.post('/racers/updateRacerTotals', racerController.updateRacerTotals);
  app.post('/racers/updateModListAndPts', checkUser, racerController.updateModListAndPts);
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
  app.get('/auth/isAuth', racerController.isAuth);
  app.post('/auth/logout', racerController.logout);
  app.get('/auth/isAdmin', racerController.isAdmin);
  app.post('/auth/email', racerController.email);
  app.post('/auth/changePassword', racerController.changePassword);
};
