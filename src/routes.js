const router = require('express').Router();

const homePageController = require('./controllers/homePage');
const userController = require('./controllers/userController');
const playController = require('./controllers/playController');

router.use('/', homePageController);
router.use('/user', userController);
router.use('/plays', playController);

router.all('*', (req, res) => res.render('404', {title: 'Page Not Found'}));


module.exports = () => router;