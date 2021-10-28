const Play = require('../models/Play');

const create = (data) => Play.create(data);

const getTop = (number) => Play.find().where({ isPublic: true }).sort({ usersLiked: -1 }).limit(number).lean();

const getAll = () => Play.find().where({ isPublic: true }).sort({ createdAt: -1 }).lean();

const getOne = (id) => Play.findById(id).lean();

const update = (id, play) => Play.findByIdAndUpdate(id, play, { runValidators: true });

const deleteById = (id) => Play.findByIdAndDelete(id);


module.exports = {
    create,
    getTop,
    getAll,
    getOne,
    update,
    deleteById
}