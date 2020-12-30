const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician',
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const postsSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician',
    },
    comments: [commentSchema],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('Post', postsSchema);