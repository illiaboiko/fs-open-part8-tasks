const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
  },
  favoriteGenre: String,
})


module.exports = mongoose.model('User', userSchema);
