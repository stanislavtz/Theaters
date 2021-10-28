const router = require('express').Router();

const homePageController = require('./controllers/homePage');
const userController = require('./controllers/userController');

router.use('/', homePageController);
router.use('/user', userController);

router.all('*', (req, res) => res.render('404', {title: 'Page Not Found'}));


module.exports = () => router;