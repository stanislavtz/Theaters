const router = require('express').Router();
const playService = require('../services/playService');

async function getHomePage(req, res) {
    let plays;
    if (req.user) {
        plays = await playService.getAll();
        res.render('home/user', { plays });
    } else {
        plays = await playService.getTop(3);
        res.render('home/guest', { plays });
    }
}

async function getSortedByDate(req, res) {
    const plays = await playService.getAll('createdAt');
    res.render('home/user', { plays });
}

async function getSortedByLikes(req, res) {
    const plays = await playService.getAll('likes');
    res.render('home/user', { plays });
}

router.get('/', getHomePage);
router.get('/plays/sort-by-date', getSortedByDate);
router.get('/plays/sort-by-likes', getSortedByLikes);

module.exports = router;