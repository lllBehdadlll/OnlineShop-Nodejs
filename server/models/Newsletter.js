const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NewsletterSchema = new Schema({
  Email: {
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

module.exports = mongoose.model('Newsletter', NewsletterSchema);