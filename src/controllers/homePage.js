const router = require('express').Router();
const playService = require('../services/playService');

async function getHomePage(req, res) {
    try {
        let plays;
        if (req.user) {
            plays = await playService.getAll();
            res.render('home/user', { plays });
        } else {
            plays = await playService.getTop(3);
            res.render('home/guest', { plays });
        }
    } catch (error) {
        res.locals.error = { message: 'Server crashed' }
        res.render('404');
    }

}

async function getSortedByDate(req, res) {
    try {
        const plays = await playService.getAll('createdAt');
        res.render('home/user', { plays });
    } catch (error) {
        res.locals.error = { message: 'Server crashed' }
        res.render('404');
    }
}

async function getSortedByLikes(req, res) {
    try {
        const plays = await playService.getAll('likes');
        res.render('home/user', { plays });
    } catch (error) {
        res.locals.error = { message: 'Server crashed' }
        res.render('404');
    }
}

router.get('/', getHomePage);
router.get('/plays/sort-by-date', getSortedByDate);
router.get('/plays/sort-by-likes', getSortedByLikes);

module.exports = router;