const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send(movie));
      } else {
        throw new Forbidden('Нельзя удалять чужой фильм');
      }
    }).catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
