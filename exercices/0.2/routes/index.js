const express = require('express');
var router = express.Router();
const app = express();

app.use(express.static('public'));

const PORT = 678;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
