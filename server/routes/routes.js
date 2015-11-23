var racerController = require('../racers/racerController');
var eventController = require('../events/eventController');
var standingsController = require('../standings/standingsController');

var path = require('path');

var isLoggedIn = function(req, res) {
  return !!req.session.user;
};

var checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    // console.log('not logged in', req.session);
    // res.redirect('/#/login');
    res.status(500).send('not logged in');
  } else {
    console.log('checkuser');
    next();
  }
};

var checkAdmin = function(req, res, next) {
  if(req.session.username !== 'admin') {
    console.log('not admin');
    res.status(500).send('not admin');
    // res.redirect(301, '/main')
  }else{
    next();
  }
}

module.exports = function (app) {
  // app.post('/totals', racerController.updateTotals);
  app.get('/racers/racerList', checkUser, racerController.racerList);
  app.get('/racers/modList', checkUser, racerController.getModList);
  app.get('/racers/otherModList', racerController.getOtherModList);
  app.post('/racers/updateRacerTotals', checkAdmin, racerController.updateRacerTotals);
  app.post('/racers/updateModListAndPts', checkUser, racerController.updateModListAndPts);
  app.post('/racers/deleteUsers', checkAdmin, racerController.deleteUsers);
  app.post('/standings/archiveStandings', checkAdmin, standingsController.archiveStandings);
  app.get('/standings/getArchive', checkUser, standingsController.getArchive);
  app.post('/standings/deleteArchive', checkAdmin, standingsController.deleteArchive);

  app.post('/events/addTrackEvent', checkAdmin, eventController.addTrackEvent);
  app.get('/events/getEvents', checkUser, eventController.getEvents);
  app.get('/events/getStats', checkUser, eventController.getStats);
  app.post('/events/deleteTrackEvents', checkAdmin, eventController.deleteTrackEvents);

  app.post('/auth/signup', racerController.signup);
  app.post('/auth/login', racerController.login);
  app.get('/auth/isAuth', checkUser, racerController.isAuth);
  app.post('/auth/logout', racerController.logout);
  app.get('/auth/isAdmin', checkAdmin, racerController.isAdmin);
  app.post('/auth/email', racerController.email);
  app.post('/auth/changePassword', racerController.changePassword);
};
