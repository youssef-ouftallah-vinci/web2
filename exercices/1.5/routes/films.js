var express = require('express');
var router = express.Router();

const films = [
    {
        id: 1,
        title: "Pokemon Giratina",
        duration: 100,
        budget: 1,
        link: "https://www.imdb.com/title/tt1160525/?ref_=fn_al_tt_1"
    },
    {
        id: 2,
        title: "Pokemon Mewtwo",
        duration: 98,
        budget: 2,
        link: "https://www.imdb.com/title/tt8856470/?ref_=fn_al_tt_2"
    },
    {
        id: 3,
        title: "Pokemon Darkrai",
        duration: 95,
        budget: 2.5,
        link: "https://www.imdb.com/title/tt1226251/?ref_=fn_al_tt_1"
    }
];


// Read the film identified by an id
router.get('/:id', (req,res) => {
    const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

   if(indexOfFilmFound < 0) return res.sendStatus(404);
   
   return res.json(films[indexOfFilmFound]);
});


// Read all the films depending on filter
router.get('/', (req, res, next) => {
    const minimumDuration =
        req?.query?.['minimum-duration']
        ? Number(req.query['minimum-duration'])
        : undefined;

    if(minimumDuration === undefined) return res.json(films);

    if(typeof minimumDuration !== 'number'|| minimumDuration <= 0) return res.sendStatus(400);

    const filteredFilms = films.filter(
        (films) => films.duration >= minimumDuration
    );

    return res.json(filteredFilms);
});

//Create a film to be added to films
router.post('/', (req,res) => {

    const title = 
        req?.body?.title?.trim()?.length !== 0 
        ? req.body.title
        : undefined;
    const duration = 
        typeof req?.body?.duration === 'number' && req.body.duration > 0
        ? req.body.duration
        : undefined;
    const budget =
        typeof req?.body?.budget === 'number' && req.body.budget >= 0
        ? req.body.budget
        : undefined;
    const link = 
        req?.body?.link?.trim()?.length !== 0
        ? req.body.link
        : undefined; 

    if(!title || !duration || !budget || !link) return res.sendStatus(400);

    const existingFilm = films.find(
        (film) => film.title.toLowerCase() == title.toLowerCase()
    );

    if(existingFilm) return res.sendStatus(409);

    const lastItemIndex = films?.length !== 0 ? films.length -1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId +1;

    const film = {
        id : nextId,
        title : title,
        duration : duration,
        budget : budget,
        link : link
    };

    films.push(film);

    return res.json(film);
});


module.exports = router;