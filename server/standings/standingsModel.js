var mongoose = require('mongoose');

var StandingsSchema = new mongoose.Schema({
  
  year: {
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

module.exports = mongoose.model('standings', StandingsSchema);