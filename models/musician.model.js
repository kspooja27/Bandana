const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
   name: String,
   category: String,
});

const musicianSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    image: String,
    gender: {type: String, enum: ['Male', 'Female', 'Other']},
    instruments: [instrumentSchema],
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


