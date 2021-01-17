const Post = require('../models/posts.model');
const Common = require('./common');

exports.add = (req, res) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        postedBy: req.body.postedBy,
    });
    post.save((err, savedPost) => {
        if (err) {
            Common.error500(err, res);
        } else {

            if (req.files) {
                let file = req.files.image;
                let fileName = file.name;
                let ext = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
                if (ext == "") ext = "." + ext;
                else ext = ".jpg";

                let filePath = 'uploads/posts/' + savedPost.id + ext;
                file.mv('public/' + filePath, (err) => {
                    if (err) Common.error500(err, res);
                })

                savedPost.image = filePath;
                savedPost.save((err, savedPostPost) => {
                    res.status(200).json({
                        code: 200,
                        message: "Post saved successfully to the postSchema",
                        post: savedPostPost,
                    });
                })

            }

        }
    });
};

exports.addComment = (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
        if (err) Common.error500(err, res);
        else {
            console.log(post);
            let newComment = {
                text: req.body.comment,
                postedBy: req.session.userId,
            };
            if (!post.comments) {
                let comments = [];
                comments.push(newComment);
                post.comments = comments;
            } else {
                post.comments.push(newComment)
            }
            post.save((err, savedPost) => {
                if (err) Common.error500(err, res);
                else {
                    res.redirect('/feed');
                    // res.redirect('/posts/' + savedPost.id);
                }
            });
        }
    })
}

exports.fetchAll = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
        } else {
            res.json({
                code: 200,
                posts: posts,
            })
        }
    }).populate('comments.postedBy');
}

exports.fileTest = (req, res) => {
    let file = req.files.image;
    let fileName = file.name;
    let ext = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
    res.json({
        fileName: fileName,
        ext: ext,
        body: req.body,
        files: req.files,

    })
}