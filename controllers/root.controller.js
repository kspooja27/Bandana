const Post = require('../models/posts.model');
const Musician = require('../models/musician.model');
const Common = require('./common');

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
        Post.find({postedBy: {$ne: req.session.userId}},(err, foundPosts) => {
            console.log(foundPosts);
            res.render("feed", {postItems: foundPosts, userImagePath: req.session.userImagePath , userId: req.session.userId});
        }).sort({created_at: -1}).populate('postedBy').populate('comments.postedBy');

        //res.send("User is logged in.")
    }
}

exports.profile = (req,res) => {
    if(!req.session.userId) {
        res.redirect('/login');
    }
    else Musician.findById(req.params.userId, (err, user) => {
        if (err) Common.error500(err, res);
        else {
            Post.find({postedBy: req.params.userId}, (err, posts) => {
                if(err) Common.error500(err, res);
                else {
                    res.render("profile", {user: user, postItems: posts});
                }
            }).sort({created_at: -1}).populate('postedBy').populate('comments.postedBy');
        }
    })
}

exports.addPost = (req, res) => {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        res.render("addPost");
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
