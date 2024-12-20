const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Campo obrigatório
  },
  email: {
    type: String,
    required: true,
    unique: true, // Garante que o email seja único
  },
  password: {
    type: String,
    required: true, // Campo obrigatório
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
