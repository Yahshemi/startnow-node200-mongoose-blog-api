// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a new mongoose Schema with five properties
const BlogSchema = new Schema({
    title: { type: String, required: true }, // title property is a string and required.
    article: { type: String, required: true },
    published: { type: Date, required: true }, // published property is a date required.
    featured: { type: Boolean, required: true },
//  authorId: { type: Object, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User'}
}, 
{usePushEach: true });

// author: {type: Schema.Types.ObjectId, ref: "User"}  
// });

module.exports = mongoose.model('Blog', BlogSchema);
