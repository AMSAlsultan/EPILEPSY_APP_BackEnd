const mongoose = require ('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    //isFeatured: {
    //    type: Boolean,
    //    default: false
    //},
    //image: {
    //    type: String,
    //    required: true, 
    //}
    color: {
        type: String,
       }
})

exports.Category = mongoose.model('Category', categorySchema);