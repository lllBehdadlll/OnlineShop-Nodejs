const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductsliderSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Productslider', ProductsliderSchema);