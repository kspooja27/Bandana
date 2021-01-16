const Post = require('../models/posts.model');


exports.register = (req, res) => {
    if (!req.session.userId) {
        res.render('register');
    } else {
        res.redirect('/feed');
    }
}

exports.login = (req, res) => {
    if (!req.session.userId) {
        res.render('login');
    } else {
        res.redirect('/feed');
    }
}

exports.feed = (req, res) => {
    console.log(req.session.userId);
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        // TODO: Add all functionalities
        Post.find({},(err, foundPosts) => {
            console.log(foundPosts);
            res.render("feed", {postItems: foundPosts });
        }).populate('postedBy').populate('comments.postedBy');

        //res.send("User is logged in.")
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
