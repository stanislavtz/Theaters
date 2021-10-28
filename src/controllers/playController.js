const router = require('express').Router();

const playService = require('../services/playService');
const userService = require('../services/userService');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

function getCreatePage(req, res) {
    res.render('theater/create');
}

async function createPlay(req, res) {
    try {
        const { title, description, imageUrl, checkBox } = req.body;

        const data = {
            title,
            description,
            imageUrl,
            owner: req.user._id
        }

        if (checkBox == 'on') {
            data.isPublic = true;
        }

        await playService.create(data);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('/plays/create', { ...req.body })
    }
}

async function getDetailsPage(req, res) {
    try {
        const play = await playService.getOne(req.params.playId);
        if (play.owner == req.user._id) {
            res.locals.user.isOwner = true;
        }
        res.render('theater/details', { ...play })

    } catch (error) {
        console.error(error);
        res.redirect('404');
    }
}

async function getEditPage(req, res) {
    try {
        const play = await playService.getOne(req.params.playId);
        if (play.isPublic) {
            play.isChecked = "true";
        }

        res.render('theater/edit', { ...play });

    } catch (error) {
        console.error(error);
        res.redirect('404');
    }

}

async function editPlay(req, res) {
    try {
        const { title, description, imageUrl, checkBox } = req.body;

        const data = {
            title,
            description,
            imageUrl,
        }

        if (checkBox == 'on') {
            data.isPublic = true;
        } else {
            data.isPublic = false
        }

        await playService.update(req.params.playId, data);
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('theater/edit', { ...req.body });
    }
}

async function deletePlay(req, res) {
    await playService.deleteById(req.params.playId);
    res.redirect('/');
}

async function likePlay(req, res) {
    const user = await userService.getById(req.user._id);
    const play = await playService.getOne(req.params.playId);

    user.likedPlays.push(play._id);
    play.usersLiked.push(user._id);

    user.hasLiked = true;

    await userService.updateById(user._id, user);
    await playService.update(user._id, user);

    res.redirect('/');
}

router.get('/create', isAuthenticated, getCreatePage);
router.post('/create', isAuthenticated, createPlay);

router.get('/:playId/details', isAuthenticated, getDetailsPage);

router.get('/:playId/edit', isAuthenticated, isAuthorized, getEditPage);
router.post('/:playId/edit', isAuthenticated, isAuthorized, editPlay);

router.get('/:playId/delete', isAuthenticated, isAuthorized, deletePlay);

router.get('/:playId/like', likePlay);

module.exports = router;