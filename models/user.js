const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    //   default: 'Жак-Ив Кусто',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
          return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v);//eslint-disable-line
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    // в БД не будет видно паролей
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
