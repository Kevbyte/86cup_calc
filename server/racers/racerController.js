var Racer = require('./racerModel');
var Q = require('q');
var jwt = require('jwt-simple');
var _ = require('underscore');
var path = require('path');
var nodemailer = require('nodemailer');

var ranks = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th']

var createSession = function(req, res, newUser) {
  console.log('newUser ', newUser)
  // return req.session.regenerate(function() {
      req.session.user = newUser;
      req.session.save();
    // });

};

module.exports = {
  //get all registered users and send them to standings and admin controllers on front end
  racerList: function (req, res) {
    // console.log('in racerController!!!==============================')
    Racer.find({})
      .select('-_id -salt -password -email')
      .sort({total: -1})
      .then(function(list) {
        // console.log('list === ', list)
        var sorted = {stock: [], street: [], limited: [], unlimited: []}
        //categorize the users based on class first before sending
        _.each(list, function(racer){
          if(racer.modPts <= 0.5 && racer.username !== "admin") {
            sorted.stock.push(racer);
          }
          if(racer.modPts > 0.5 && racer.modPts <= 4.0) {
            sorted.street.push(racer);
          }
          if(racer.modPts > 4.0 && racer.modPts <= 7.0) {
            sorted.limited.push(racer);
          }
          if(racer.modPts > 7.0) {
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
    var racer = req.session.user.username;
    Racer.findOne({username: racer})
      .select('-_id -salt -password -email')
      .then(function (result) {
        // console.log('result === ', result)
        res.send(result);
      })
  },

  getOtherModList: function (req, res) {
    // console.log('req.query', req.query.name)
    var racer = req.query.name.toLowerCase();
    Racer.findOne({username: racer})
      .select('-_id -salt -password -email')
      .then(function (result) {
        // console.log('result === ', result)
        var activeMods = {};
        activeMods.drivetrain = [];
        activeMods.wheels = [];
        activeMods.aero = [];
        activeMods.suspension = [];
        _.each(result.modList.drivetrain, function(mod) {
          if(mod.active){
            activeMods.drivetrain.push(mod);
          }
        })
        _.each(result.modList.wheels, function(mod) {
          if(mod.active){
            activeMods.wheels.push(mod);
          }
        })
        _.each(result.modList.aero, function(mod) {
          if(mod.active){
            activeMods.aero.push(mod);
          }
        })
        _.each(result.modList.suspension, function(mod) {
          if(mod.active){
            activeMods.suspension.push(mod);
          }
        })
        result.modList = activeMods;
        res.send(result);
      })
  },

  //admins can update user's information like points earned at an event
  updateRacerTotals: function(req, res) {
    console.log('req.body.nuke === ', req.body.nuke)
    var stock = req.body.stock.racers;
    var street = req.body.street.racers;
    var limited = req.body.limited.racers;
    var unlimited = req.body.unlimited.racers;

    if(req.body.nuke === "nuke") {
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
            // console.log(user);
          });
        }
        if(racer.reset) {
          user[0].total = 0;
          user[0].save(function(err) {
            if(err) throw err;
            // console.log(user);
          });
        }
          
      });
    })
    _.each(street, function (racer) {
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
              // console.log(user);
            });
          }
          if(racer.reset) {
            user[0].total = 0;
            user[0].save(function(err) {
              if(err) throw err;
              // console.log(user);
            });
          }
      });
    })
    _.each(limited, function (racer) {
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
              // console.log(user);
            });
          }
          if(racer.reset) {
            user[0].total = 0;
            user[0].save(function(err) {
              if(err) throw err;
              // console.log(user);
            });
          }
      });
    })
    _.each(unlimited, function (racer) {
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
              // console.log(user);
            });
          }
          if(racer.reset) {
            user[0].total = 0;
            user[0].save(function(err) {
              if(err) throw err;
              // console.log(user);
            });
          }
      });
    })
    res.sendStatus(200);
  },

  updateModListAndPts: function(req, res) {
    var username = req.session.user.username;
    var avatar = req.body.avatar
    var modList = req.body.modList.mods;
    var modPts = req.body.modPts;
    console.log("modlistandpts req.body ===", req.body)

    Racer.findOne({username: username})
      .then(function (racer) {
        // console.log(racer)
        racer.avatar = avatar;
        racer.modList = modList;
        racer.modPts = modPts;
        racer.save(function(err) {
          console.log("racer ========", racer);
          if(err) {
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        })
        
        
      })
  },

  deleteUsers: function(req, res) {
    Racer.find({}).remove().exec();
    res.sendStatus(200);
  },

  signup: function (req, res, next) {
    var username  = req.body.username.toLowerCase(),
        password  = req.body.password,
        email = req.body.email,
        create,
        newRacer;

    var findOne = Q.nbind(Racer.findOne, Racer);

    // check to see if user already exists
    findOne({email: email})
      .then(function (racer) {
        if(racer) {
          res.status(500).send('That email is already registered!');
        }else{
          findOne({username: username})
            .then(function (racer) {
              if (racer) {
                res.status(500).send('That username already exists!');
              } else {
                // make a new user if not one
                create = Q.nbind(Racer.create, Racer);
                newRacer = {
                  username: username,
                  password: password,
                  email: email
                };
                return create(newRacer);
              }
            })
            .then(function (racer) {
              racer.save();
              createSession(req, res, racer);
              console.log('req.session = ', req.session)

              // create token to send back for auth
              // var token = jwt.encode(racer, 'secret');
              // res.json({token: token});
              res.status(200).send('You have signed up and are logged in!')
            })
        }
      })

    
      // .fail(function (error) {
      //   next(error);
      // });
  },

  login: function (req, res, next) {
    var username = req.body.username.toLowerCase(),
        password = req.body.password;

    Racer.findOne({username: username})
      .then(function (racer) {
        if (!racer) {
          res.status(500).send('Invalid username!');
        } else {
          // console.log(racer)
          return racer.comparePasswords(password)
            .then(function(foundUser) {
              console.log("foundUser === ", foundUser)
              if (foundUser) {
                // createSession(req, res, racer);
                createSession(req, res, racer);
                console.log('req.session = ', req.session)
                // var token = jwt.encode(racer, 'secret');
                // res.json({token: token});

                //Set the user to be online
                racer.save();
                res.status(200).send('You are logged in!')

              } else {
                res.status(500).send('Invalid password!')
              }
            });
        }
        // createSession(req, res, racer);
      })
      // .fail(function (error) {
      //   next(error);
      // });
  },

  isAuth: function (req, res) {
    if(req.session.user) {
      res.status(200).send('User is Auth!')
    }else{
      res.status(500).send('User is not Auth!')
    }
  },

  logout: function (req, res) {
    var username = req.session.user
    var findUser = Q.nbind(Racer.findOne, Racer);
    req.session.destroy();
    console.log('req.session in logout = ', req.session)
    res.status(200).send('you are logged out');
    
    // findUser({username: username})
    //   .then(function (user) {
    //     user.save();
    //     res.status(200).send('you are logged out');
    //   });
  },

  isAdmin: function (req, res) {
    if(req.session.user.username === 'admin') {
      res.status(200).send('User is Admin!')
    }else{
      res.status(500).send('User is not Admin!')
    }
  },

  email: function (req, res) {
    var email = req.body.email.toLowerCase();
    var array = [];
    

    var generateCode = function() {
      var result = [];
      for(var i=0; i<4; i++) {
        result.push(Math.floor(9 * Math.random()));
      }
      return result.join('');
    }

    var code = generateCode();

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '86cup.io@gmail.com',
            pass: '38637oversteer'
        }
    });
     
    // NB! No need to recreate the transporter object. You can use 
    // the same transporter object for all e-mails 
     
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: '86cup.io ✔ <86cup.io@gmail.com>', // sender address 
        to: email, // list of receivers 
        subject: 'Password Reset', // Subject line 
        text: 'You can now reset your password with this access code: '+ code +' DO NOT REPLY TO THIS MESSAGE!', // plaintext body 
        html: '<b>You can now reset your password with this access code: '+ code +' DO NOT REPLY TO THIS MESSAGE!</b>' // html body 
    };

    Racer.findOne({email: email})
    .then(function(user) {
      user.code = code;
      user.save();
      console.log(user)
      return user;
    })
    .then(function(user) {
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
          res.sendStatus(200);
       
      });
      setTimeout(function(){
        console.log('setting user.code to null ', user.code)
        user.code = null;
      }, 100000)
    }).catch(function(error) {
      console.log('email error ', error)
    })
    // send mail with defined transport object 

        
  },

  changePassword: function(req, res) {
    console.log(req.body.data)
    var code = req.body.data.code;
    var password = req.body.data.password;
    var username = req.body.data.username.toLowerCase();

    Racer.findOne({username: username}).then(function(user) {
      console.log('user.code = ', user.code)
      if(user.attempts === 0) {
        res.status(500).send('Sorry you have maxed out your attempts. Please try again in 30 mins.');
        setTimeout(function(){
          user.attempts = 3;
          user.save();
        }, 3000)
        // 1800000
      }else{
        if(code && code === user.code) {
          user.password = password;
          return user;
        }else{
          console.log('code does not match')
          res.status(500).send('The code you entered does not match');
          user.attempts--;
          user.save()
          console.log(user.attempts)
        }
      }
    }).then(function(updatedUser) {
      updatedUser.save();
      res.sendStatus(200);
    })
  }
}