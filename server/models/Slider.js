const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SliderSchema = new Schema({
  Picture: {
    type: String,
    required: true
  },
  PictureAlt: {
    type: String,
    required: true
  },
  PictureTitle: {
    type: String,
    required: true
  },
  Heading: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Text: {
    type: String,
    required: true
  },
  BtnText: {
    type: String,
    required: true
  },
  Link: {
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

module.exports = mongoose.model('Slider', SliderSchema);