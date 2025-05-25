const mongoose = require('mongoose')

const add_story = mongoose.Schema({

    title: {type: String, required: true},
    story: {type: String, required: true},
    visitedLocation: {type: [String], default: []},
    isFavourite: {type: Boolean, default: false},
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}],
    CreatedOn: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    visitedDate: {type: Date, required: true}
    
})

const travelStorySchema = mongoose.model('travelstory', add_story)
module.exports = travelStorySchema;