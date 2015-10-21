var Event = require('./eventModel');
var _ = require('underscore');
var Q = require('q');
var jwt = require('jwt-simple');
var path = require('path');

var ranks = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']

module.exports = {
  addTrackEvent: function(req, res, next) {
    console.log('addTrackEvent req.body.limited === ', req.body.limited)
    var round = req.body.round;
    var track = req.body.track;
    var date = req.body.date;
    var stock = req.body.stock.racers;
    var street = req.body.street.racers;
    var limited = req.body.limited.racers;
    var unlimited = req.body.unlimited.racers;

    if(req.body.nukeEvent === "nuke") {
      Event.find({}).remove().exec();
    }

    Event.findOne({round: round})
      .then(function (event) {
        if (event) {
          next(new Error('Event already exists!'))
        } else {
          // make a new event if not one
          console.log("making new event")
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
        res.sendStatus(200);
        console.log(newEvent)
      })
  },

  getEvents: function (req, res) {
    Event.find({})
      // .select('-_id -salt -password')
      .sort({round: -1})
      .then(function(events) {
        res.send(events);
      })
  },
}