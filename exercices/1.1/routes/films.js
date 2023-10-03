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


/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json(films);
});

module.exports = router;