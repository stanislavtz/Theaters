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

router.get('/', getHomePage);

module.exports = router;