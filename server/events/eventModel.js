var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  round: {
    type: Number,
    unique: true,
    required: true
  },

  track: {
    type: String,
  },

  date: {
    type: String,
  },

  stock: {
    type: Array,
  },

  street: {
    type: Array,
  },

  limited: {
    type: Array,
  },

  unlimited: {
    type: Array,
  }

});

module.exports = mongoose.model('events', EventSchema);