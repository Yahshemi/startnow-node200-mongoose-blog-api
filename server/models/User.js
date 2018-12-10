// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a new mongoose Schema with two properties
const UserSchema = new Schema({
    firstName: { type: String, required: true }, //firstName property is a string and required
    lastName: { type: String, required: true },

    //New property
    social: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        linkedIn: { type: String, required: false }
    },

    email: { type: String, required: true },

    // gamingSystems: {
    //     playStation: { type: String, required: true },
    //     xBox: { type: String, required: false },
    //     gameCube: { type: String, required: false }
    // },

   blogs: [{ type: Schema.Types.ObjectId, 'ref': 'Blog' }]}, {usePushEach: true });
   //blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }];



module.exports = mongoose.model('User', UserSchema);
