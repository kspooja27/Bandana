const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
const passwordHash = require("password-hash");
const fileUpload = require('express-fileupload');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URI_DEV;
let mongoDB = process.env.MONGODB_URI || mongoURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));


app.get('/', function (req, res) {
    res.send(200);
});

app.use('/user', require('./routes/musician.routes'));
app.use('/posts', require('./routes/posts.routes'));




let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started on port " + port);
});