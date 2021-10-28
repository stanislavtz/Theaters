const bcrypt = require('bcrypt');

const User = require('../models/User');

const { JWT_SECRET } = require('../utils/constants');
const { jwtSign } = require('../utils/jwtUtil');

function register(data) {
    const { name, username, password, rePassword } = data; // Depends of body sent by request

    if (password !== rePassword) {
        throw { message: 'Password don\'t match' }
    }

    return User.create({ name, username, password }); // Depends of User model
}

async function login(data) {
    const { username, password } = data; // Depends of body sent by request
    if (!username) {
        throw { message: 'Username is required' }
    }

    if (!password) {
        throw { message: 'Password is required' }
    }

    const user = await User.findOne({ username }); // Depends of project terms
    if (!user) {
        throw { message: 'Invalid username or password' }
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw { message: 'Invalid username or password' }
    }

    const token = jwtSign({ _id: user._id, username }, JWT_SECRET, { expiresIn: '1d' });

    return token;
}

function getById(id) {
    return User.findById(id).lean();
}

function updateById(id, user) {
    return User.findByIdAndUpdate(id, user);
}

module.exports = {
    register,
    login,
    getById,
    updateById
}