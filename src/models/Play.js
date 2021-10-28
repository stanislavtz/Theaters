const mongoose = require('mongoose');

const playSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            max: 50
        },
        imageUrl: {
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        usersLiked: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Play = mongoose.model('Play', playSchema);

module.exports = Play;
