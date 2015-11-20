var mongoose = require('mongoose');
    bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    SALT_WORK_FACTOR  = 10;


var RacerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },

  password: {
    type: String,
    required: true
  },

  code: {
    type: Number,
    default: null
  },

  attempts: {
    type: Number,
    default: 3
  },
  
  salt: String,

  avatar: {
    type: String,
    default: "../assets/car-placeholder.png"
  },

  rank: {
    type: String,
    default: 'none'
  },

  modPts: {
    type: Number,
    default: 0
  },

  modList: {
    type: Object,
    default: {
      drivetrain: [
      {name: 'Any aftermarket intake system or modification to OEM intake (excludes drop-in OE replacement filters, such as TRD)', value: 0.25, active: false},
      {name: 'Any aftermarket header with a catalytic converter', value: 0.125, active: false},
      {name: 'Any aftermarket header without a catalytic converter', value: 0.25, active: false},
      {name: 'High-flow catalytic converter front pipe', value: 0.125, active: false},
      {name: 'catless front pipe', value: 0.25, active: false},
      {name: 'Cat-back or axle-back exhaust', value: 0, active: false},
      {name: 'Internal engine modifications (pistons, rods, crank, etc.)', value: 1, active: false},
      {name: 'Built head or aftermarket head (cams, valve springs, valves, etc.)', value: 1, active: false},
      {name: 'Any Forced Induction (e.g. AVO, Greddy, Jackson Racing, Innovate, Kraftwerks, Vortech, etc); must take separate penalties for ECU, and header as applicable', value: 2.5, active: false},
      {name: 'Aftermarket ECU or OEM ECU reflash', value: 0, active: false},
      {name: 'E85 tune', value: 1.0, active: false},
      {name: 'Aftermarket Axles', value: 0, active: false},
      {name: 'Aftermarket Driveshaft', value: 0.25, active: false},
      {name: 'Aftermarket transmission', value: 1.0, active: false},
      {name: 'Non-OEM Clutch and/or Flywheel and/or Pressure Plate', value: 0.25, active: false},
      {name: 'Non-OEM LSD', value: 0.25, active: false},
      {name: 'Non-OEM Final Drive', value: 0, active: false},
      {name: 'Engine Swap (can be ANY engine, must take points individually for modifications non-OEM to that specific engine or the original chassis, e.g. headers, intake, etc.)', value: 4.5, active: false}
      ],
      wheels: [
      {name: 'Any street tire TW 320+', value: -2, active: false},
      {name: 'Any street tire TW 220-300', value: -1, active: false},
      {name: 'Any street tire: TW 140-200', value: 0, active: false},
      {name: 'Level 1 R-compound tire (100TW)', value: 1, active: false},
      {name: 'Level 2 R-compound tire (60-80TW)', value: 2, active: false},
      {name: 'Level 3 R-compound tire (0-50TW, DOT)', value: 3, active: false},
      {name: 'Level 4 R-compound tire (non-DOT slicks)', value: 4, active: false},
      {name: '215 width tires', value: 0, active: false},
      {name: '225 width tires', value: 0.25, active: false},
      {name: '235 width tires', value: 0.50, active: false},
      {name: '245 width tires', value: 0.75, active: false},
      {name: '255+ width tires', value: 1, active: false},
      {name: 'OEM wheels', value: 0, active: false},
      {name: 'Wheel spacers', value: 0, active: false},
      {name: '5-7.5" width aftermarket wheels', value: 0.125, active: false},
      {name: '8" width aftermarket wheels', value: 0.25, active: false},
      {name: '8.5" width aftermarket wheels', value: 0.375, active: false},
      {name: '9" width aftermarket wheels', value: 0.5, active: false},
      {name: '9.5" width aftermarket wheels', value: 0.625, active: false},
      {name: '10+" width aftermarket wheels', value: 0.75, active: false}
      ],
      aero: [
      {name: 'Level 1 Front Aero: aftermarket front bumper or any aftermarket lip, including TRD and STi (must not have splitter built-in)', value: 0.25, active: false},
      {name: 'Level 2 Front Aero: full front aero package (anything more than a simple lip or bumper; can include any spats and canards, splitters)', value: 0.5, active: false},
      {name: 'Canard Set (each set L/R, if not combined with L2 Front Aero)', value: 0.125, active: false},
      {name: 'Spats only (each set L/R, if not combined with L2 Front Aero)', value: 0.125, active: false},
      {name: 'Level 1 Rear Aero: rear diffuser that starts behind rear axles', value: 0.25, active: false},
      {name: 'Level 2 Rear Aero: rear diffuser that starts in front of rear axles', value: 0.50, active: false},
      {name: 'Vented hood', value: 0.125, active: false},
      {name: 'Vented fender and/or wide fenders', value: 0.125, active: false},
      {name: 'Aftermarket or modified/cut rear bumper', value: 0.125, active: false},
      {name: 'Vortex generators', value: 0.125, active: false},
      {name: 'OEM rear spoiler', value: 0, active: false},
      {name: 'Aftermarket rear spoiler (e.g. 5-axis, integrated duckbill in trunk, STi gurney flap)', value: 0.25, active: false},
      {name: 'Level 1 Wing: APR GTC-200 (all versions), Voltex 1S wing or smaller, 245mm stands maximum', value: 1.5, active: false},
      {name: 'Level 2 Wing: Any adjustable wing bigger than APR GTC-200/Voltex 1S', value: 2, active: false},
      {name: 'APR 2.5” Riser (applies only to APR GTC-200)', value: 0.125, active: false},
      {name: '275mm stands (applies to Voltex 1S only)', value: 0.125, active: false},
      {name: 'Gurney Flap (applies to Level 1 Wing only)', value: 0.125, active: false},
      {name: 'OEM underbody panels, including Blue Edition panels', value: 0, active: false}
      ],
      suspension: [
      {name: 'Any OEM BRZ or FRS suspension', value: 0, active: false},
      {name: 'Any OEM or aftermarket sway bars', value: 0, active: false},
      {name: 'Any aftermarket top hat/damper mount, including camber plates', value: 0.375, active: false},
      {name: 'Any camber bolts', value: 0, active: false},
      {name: 'Any rear lower control arm', value: 0.125, active: false},
      {name: 'Aftermarket springs with OEM dampers', value: 0.5, active: false},
      {name: 'Aftermarket damper with OEM springs', value: 0.5, active: false},
      {name: 'Aftermarket springs with any off the shelf non-adjustable dampers', value: 1, active: false},
      {name: 'Any aftermarket damper with any aftermarket spring, or any coilover suspension', value: 2, active: false},
      {name: 'Any altered suspension mounting points, including offset mounts offset spring perches', value: 0.5, active: false}
      ],

    }

  },

  class: {
    type: String,
    default: 'stock'

  },

  total: {
    type: Number,
    default: 0
  },

  delete: {
    type: String,
    default: ''
  }
});

RacerSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

RacerSchema.pre('save', function (next) {
  var racer = this;

  // only hash the password if it has been modified (or is new)
  if (!racer.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(racer.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      racer.password = hash;
      racer.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('racers', RacerSchema);