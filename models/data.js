var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //https://github.com/UWHackers/WebDev/blob/master/p3/source/3/models/post.js
    //https://www.youtube.com/watch?v=e23EJMy1PdA
    var postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Post', postSchema);
