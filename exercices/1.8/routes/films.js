const express = require('express');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const listOfFilms = [
  {
    id: 1,
    title: 'Pokemon Giratina',
    duration: 100,
    budget: 1,
    link: 'https://www.imdb.com/title/tt1160525/?ref_=fn_al_tt_1',
  },
  {
    id: 2,
    title: 'Pokemon Mewtwo',
    duration: 98,
    budget: 2,
    link: 'https://www.imdb.com/title/tt8856470/?ref_=fn_al_tt_2',
  },
  {
    id: 3,
    title: 'Pokemon Darkrai',
    duration: 95,
    budget: 2.5,
    link: 'https://www.imdb.com/title/tt1226251/?ref_=fn_al_tt_1',
  },
];

// Read the film identified by an id
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, listOfFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id === req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

// Read all the films depending on filter
router.get('/', (req, res) => {
  const minimumDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  const films = parse(jsonDbPath, listOfFilms);

  if (minimumDuration === undefined) return res.json(films);

  if (typeof minimumDuration !== 'number' || minimumDuration <= 0) return res.sendStatus(400);

  const filteredFilms = films.filter((film) => film.duration >= minimumDuration);

  return res.json(filteredFilms);
});

// Create a film to be added to films
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const duration =
    typeof req?.body?.duration === 'number' && req.body.duration > 0
      ? req.body.duration
      : undefined;
  const budget =
    typeof req?.body?.budget === 'number' && req.body.budget >= 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.trim()?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const films = parse(jsonDbPath, listOfFilms);

  const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase());

  if (existingFilm) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const film = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(film);

  serialize(jsonDbPath, films);

  return res.json(film);
});

// Delete a film from films

router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, listOfFilms);

  const id = Number(req.params.id);

  const foundIndex = films.findIndex((film) => film.id === id);

  if (foundIndex < 0) return res.sendStatus(404);

  const filmRemovedFromFilms = films.splice(foundIndex, 1);
  const filmRemoved = filmRemovedFromFilms[0];

  serialize(jsonDbPath, films);

  return res.json(filmRemoved);
});

// Uptade a film from films

router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, listOfFilms);

  const foundIndex = films.findIndex((film) => film.id === req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if does not exist and the id is not existant

router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    !duration ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, listOfFilms);

  const id = Number(req.params.id);

  const foundIndex = films.findIndex((film) => film.id === id);

  if (foundIndex < 0) {
    const film = {
      id: Number(req.params.id),
      title,
      duration,
      budget,
      link,
    };
    films.push(film);
    serialize(jsonDbPath, films);
    return res.json(film);
  }

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
