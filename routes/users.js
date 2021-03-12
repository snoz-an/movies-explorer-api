const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/),
  }),
}), updateUser);

module.exports = router;
