var Racer = require('./racerModel');
var Q = require('q');
var jwt = require('jwt-simple');
var _ = require('underscore');
var path = require('path');

var ranks = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']

module.exports = {
  //get all registered users and send them to standings and admin controllers on front end
  racerList: function (req, res) {
    // console.log('in racerController!!!==============================')
    Racer.find({})
      .select('-_id -salt -password')
      .sort({total: +1})
      .then(function(list) {
        // console.log('list === ', list)
        var sorted = {stock: [], street: [], limited: [], unlimited: []}
        //categorize the users based on class first before sending
        _.each(list, function(racer){
          if(racer.modPts <= 0.5 && racer.username !== "admin") {
            sorted.stock.push(racer);
          }
          if(racer.modPts > 0.5 && racer.modPts <= 4.5) {
            sorted.street.push(racer);
          }
          if(racer.modPts > 4.5 && racer.modPts <= 6.0) {
            sorted.limited.push(racer);
          }
          if(racer.modPts > 6.0) {
            sorted.unlimited.push(racer);
          }
        })
        //also calculate every user's rank before sending
        for(var key in sorted) {
          var count = 0;
          _.each(sorted[key], function(racer){
            if(racer.total > -1) {
              racer.rank = ranks[count];
              count++;
            }
          })
        }
        // console.log('sorted === ', sorted)
        res.send(sorted);
      })
  },

  //get a single user's information and send it to front end
  getModList: function (req, res) {
    // console.log('req.query', req.query.name)
    var racer = req.query.name.toLowerCase();
    Racer.findOne({username: racer})
      .select('-_id -salt -password')
      .then(function (result) {
        // console.log('result === ', result)
        res.send(result);
      })
  },

  //admins can update user's information like points earned at an event
  updateRacerTotals: function(req, res) {
    console.log('updating totals')
    var stock = req.body.stock.racers;
    var street = req.body.street.racers;
    var limited = req.body.limited.racers;
    var unlimited = req.body.unlimited.racers;

    if(req.body.nuke = "nuke") {
      Racer.find({}).remove().exec();
    }

    _.each(stock, function (racer) {
      Racer.find({username: racer.name})
      .then(function (user) {
        if(racer.delete === "delete") {
          console.log("deleting user")
          Racer.find({username: racer.name}).remove().exec();
        }
        if(racer.add){
          user[0].total += racer.add;
          user[0].save(function(err) {
            if(err) throw err;
            console.log(user);
          });
        }
          
      });
    })
    _.each(street, function (racer) {
      Racer.find({username: racer.name})
      .then(function (user) {
          if(racer.add){
            user[0].total += racer.add;
            user[0].save(function(err) {
              if(err) throw err;
              console.log(user);
            });
          }
      });
    })
    _.each(limited, function (racer) {
      Racer.find({username: racer.name})
      .then(function (user) {
          if(racer.add){
          user[0].total += racer.add;
          user[0].save(function(err) {
            if(err) throw err;
            console.log(user);
          });
        }
      });
    })
    _.each(unlimited, function (racer) {
      Racer.find({username: racer.name})
      .then(function (user) {
          if(racer.add){
          user[0].total += racer.add;
          user[0].save(function(err) {
            if(err) throw err;
            console.log(user);
          });
        }
      });
    })
    res.sendStatus(200);
  },

  updateModListAndPts: function(req, res) {
    var username = req.body.racer.name.toLowerCase();
    var avatar = req.body.avatar
    var modList = req.body.modList.mods;
    var modPts = req.body.modPts;
    // console.log("mod req.body ===", req.body)

    Racer.findOne({username: username})
      .then(function (racer) {
        console.log(racer)
        racer.avatar = avatar;
        racer.modList = modList;
        racer.modPts = modPts;
        racer.save(function(err) {
          if(err) throw err;
          // console.log("racer ========", racer);
          res.sendStatus(200);
        })
        
        
      })
  },

  signup: function (req, res) {
    console.log('req.body.username === ', req.body.username)
    console.log('req.body.password === ', req.body.password)
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newRacer;

    var findOne = Q.nbind(Racer.findOne, Racer);

    // check to see if user already exists
    findOne({username: username})
      .then(function (racer) {
        if (racer) {
          next(new Error('Racer already exists!'));
        } else {
          // make a new user if not one
          create = Q.nbind(Racer.create, Racer);
          newRacer = {
            username: username,
            password: password
          };
          return create(newRacer);
        }
      })
      .then(function (racer) {
        
        racer.save();

        // create token to send back for auth
        var token = jwt.encode(racer, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  login: function (req, res) {
    var username = req.body.username.toLowerCase(),
        password = req.body.password;

    var findRacer = Q.nbind(Racer.findOne, Racer);
    findRacer({username: username})
      .then(function (racer) {
        if (!racer) {
          next(new Error('User does not exist'));
        } else {
          return racer.comparePasswords(password)
            .then(function(foundUser) {
              console.log(foundUser)
              if (foundUser) {
                var token = jwt.encode(racer, 'secret');
                res.json({token: token});

                //Set the user to be online
                racer.save();

              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(Racer.findOne, Racer);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  logout: function (req, res) {
    // console.log("this is req.body",req.body);
    var username = req.body.username.toLowerCase();
    var findUser = Q.nbind(Racer.findOne, Racer);
    
    findUser({username: username})
      .then(function (user) {

        user.save();
      });
  }
}