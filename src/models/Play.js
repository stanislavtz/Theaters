const mongoose = require('mongoose');

const playSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            validate: [/^[-\w ]*[^\s\W].?$/, 'Can not be empty string']
        },
        description: {
            type: String,
            required: true,
            max: 50,
            validate: [/^[-\w ]*[^\s\W].?$/, 'Can not be empty string']
        },
        imageUrl: {
            type: String,
            required: true,
            validate: [/^[-\w ]*[^\s\W].?$/, 'Can not be empty string']
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
