var Standings = require('./standingsModel');
var Racer = require('../racers/racerModel');
var _ = require('underscore');
var Q = require('q');
var jwt = require('jwt-simple');
var path = require('path');

module.exports = {
  archiveStandings: function(req, res, next) {
    console.log('req.body', req.body)
    var year = req.body.year;
    var stock = req.body.stock;
    var street = req.body.street;
    var limited = req.body.limited;
    var unlimited = req.body.unlimited

    if(req.body.nukeEvent === "nuke") {
      Event.find({}).remove().exec();
    }

    Standings.findOne({year: year})
      .then(function (standings) {
        if (standings) {
          next(new Error('Standings Record already exists!'))
        } else {
          // make a new archived standings report
          console.log("making new standings report")
          newStandings = {
            year: year,
            stock: stock,
            street: street,
            limited: limited,
            unlimited: unlimited
          };
          return Standings.create(newStandings);
        }
      })
      .then(function (newStandings) {
        newStandings.save();
        //reset everyone's current total points to 0
        _.each(stock.racers, function (racer) {
          Racer.find({username: racer.username})
          .then(function (user) {
              user[0].total = 0;
              user[0].save(function(err) {
                if(err) throw err;
                // console.log(user);
              });
          });
        })
        _.each(street.racers, function (racer) {
          Racer.find({username: racer.username})
          .then(function (user) {
                user[0].total = 0;
                user[0].save(function(err) {
                  if(err) throw err;
                  // console.log(user);
                });
          });
        })
        _.each(limited.racers, function (racer) {
          Racer.find({username: racer.username})
          .then(function (user) {
                user[0].total = 0;
                user[0].save(function(err) {
                  if(err) throw err;
                  // console.log(user);
                });
          });
        })
        _.each(unlimited.racers, function (racer) {
          Racer.find({username: racer.username})
          .then(function (user) {
                user[0].total = 0;
                user[0].save(function(err) {
                  if(err) throw err;
                  // console.log(user);
                });
          });
        })
        res.sendStatus(200);
        console.log(newStandings)
      })
  },

  getArchive: function(req, res, next) {
    Standings.find({})
      .sort({year: -1})
      .then(function(list){
        res.send(list);
      })
  },

  deleteArchive: function(req, res) {
    Standings.find({}).remove().exec();
    res.sendStatus(200);
  },
}