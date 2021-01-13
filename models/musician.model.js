const mongoose = require("mongoose");

const musicianSchema = new mongoose.Schema({
    name: String,
    phone: {type: Number, unique: true},
    email: {type: String, unique: true},
    image: String,
    gender: {type: String, enum: ['Male', 'Female', 'Other']},
    password: String,
    location: {
        latitude: String,
        longitude: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('Musician', musicianSchema);


