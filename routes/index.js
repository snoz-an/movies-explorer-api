const router = require('express').Router();
const userRouts = require('./users');
const moviesRouts = require('./movies');

router.use('/users', userRouts);
router.use('/movies', moviesRouts);

module.exports = router;
