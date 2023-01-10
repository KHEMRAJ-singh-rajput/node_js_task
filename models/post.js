const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postschema =
    mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: Schema.Types.String,
            required: true
        },
        isActive: {
            type: Schema.Types.Boolean,
            required: true
        },
        geolocation: {
            latitude: {
                type: Schema.Types.Number,
                required: true
            },
            longitude: {
                type: Schema.Types.Number,
                required: true
            }
        }

    },{ timestamps: true })
const Post = mongoose.model('Post', postschema)

module.exports = Post

