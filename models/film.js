const mongoose = require('mongoose');


const filmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
     numberofflashes: {
        type: String,
        required: true,
    },
    timesofflashes: {
        type: String,
        required: true,
    },
    filmstory: {
        type: String,
        default: ''
    },
    image: {
        type: String,
       required: true,
    },
    category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category',
       required: true,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    }
})


filmSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

filmSchema.set('toJSON', {
    virtuals: true,
});

exports.Film = mongoose.model('Film', filmSchema);