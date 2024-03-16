const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const forumpostsSchema = new Schema({ 
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: false
    },
    poster: {
        type: String,
        required: true
    },
    forumBody: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    comments: [
        {
            commenterId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'users',
                required: true
            },
            commenter: {
                type: String,
                required: true
            },
            commentBody: {
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true});

const forum = mongoose.model('forumpost', forumpostsSchema);
module.exports = forum;