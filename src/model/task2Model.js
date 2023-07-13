const mongoose = require('mongoose');

const collection1Schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp:{
    type: String,
    required: true, 
  }
});

const collection2Schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp:{
    type: String,
    required: true,
  }
});

const Collection1 = mongoose.model('Collection1', collection1Schema);
const Collection2 = mongoose.model('Collection2', collection2Schema);

module.exports = { Collection1, Collection2 };
