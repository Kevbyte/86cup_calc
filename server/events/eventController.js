var Event = require('./eventModel');
var _ = require('underscore');

var ranks = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']

module.exports = {
  addTrackEvent: function(req, res) {
    // console.log('addTrackEvent req.body === ', req.body)
    var round = req.body.round;
    var track = req.body.track;
    var date = req.body.date;
    var stock = req.body.stock;
    var street = req.body.street;
    var limited = req.body.limited;
    var unlimited = req.body.unlimited;

    Event.findOne({round: round})
      .then(function (event) {
        if (event) {
          res.send('ERROR event already exists')
        } else {
          // make a new event if not one
          newEvent = {
            round: round,
            track: track,
            date: date,
            stock: stock,
            street: street,
            limited: limited,
            unlimited: unlimited
          };
          return Event.create(newEvent);
        }
      })
      .then(function (newEvent) {
        newEvent.save();
        console.log(newEvent)
        res.sendStatus(200);
      })

  }
}