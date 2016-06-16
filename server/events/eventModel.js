var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: true
  },

  track: {
    type: String
  },

  date: {
    type: String
  },

  stock: {
    type: Array
  },

  street: {
    type: Array
  },

  limited: {
    type: Array
  },

  unlimited: {
    type: Array
  }

});

var UpcomingEventSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: true,
    unique: true
  },

  track: {
    type: String
  },

  date: {
    type: String
  },

  organization: {
    type: String
  },

  notes: {
    type: String
  }

});

module.exports = mongoose.model('events', EventSchema);
module.exports = mongoose.model('upcomingEvents', UpcomingEventSchema);