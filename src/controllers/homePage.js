const router = require('express').Router();

function getHomePage(req, res) {
    if(req.user) {
        res.render('home/user');
    } else {
        res.render('home/guest')
    }
}

router.get('/', getHomePage);

module.exports = router;