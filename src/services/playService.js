const Play = require('../models/Play');

const create = (data) => Play.create(data);

const getTop = (number) => Play.find().where({ isPublic: true }).sort({ usersLiked: -1 }).limit(number).lean();

const getAll = (params) => {
    if(!params) {
        return Play.find().where({ isPublic: true }).sort({ createdAt: -1 }).lean();
    }

    if(params == 'likes') {
        return Play.find().where({ isPublic: true }).sort({ usersLiked: -1 }).lean();
    }

    return Play.find().where({ isPublic: true }).sort({ createdAt: 1 }).lean();
}

const getById = (id) => Play.findById(id).lean();

const updateById = (id, play) => Play.findByIdAndUpdate(id, play, { runValidators: true });

const deleteById = (id) => Play.findByIdAndDelete(id);


module.exports = {
    create,
    getTop,
    getAll,
    getById,
    updateById,
    deleteById
}