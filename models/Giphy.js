const mongoose = require('mongoose');

const giphySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const Giphy = mongoose.model('Giphy', giphySchema);

module.exports = Giphy;
