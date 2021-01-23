const Musician = require("../models/musician.model");
const passwordHash = require("password-hash");

exports.register = (req, res) => {
    let musician = new Musician({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        password: passwordHash.generate(req.body.password),
    });
    musician.save((err, savedMusician) => {
        if (err) {
            if (err.code == 11000) {
                console.log(err);
                res.render('register', {alert: 'Phone/Email already registered. Proceed to <a href="/login">login</a>.'})
            }
            else {
                console.log(err);
                res.render('register', {alert: 'Internal Server Error! Try again later.'})

            }
        } else {
            if(req.files) {
                let file = req.files.image;
                let fileName = file.name;
                let ext = fileName.slice((Math.max(0,fileName.lastIndexOf('.')) || Infinity) +1);
                if(ext == "") ext = "." + ext;
                else {
                    ext = ".jpg";
                }
                let filePath = "uploads/users/" +savedMusician.id + ext;
                file.mv('public/' + filePath, (err) => {
                    if(err) Common.error500(err, res)
                })

                savedMusician.image = filePath;
                savedMusician.save((err, savedImage) => {
                    res.redirect('/login');
                })
            }
        }
    });

};

exports.login = (req, res) => {
    const password = req.body.password;
    Musician.findOne(isNaN(req.body.username) ? {email: req.body.username} : {phone: req.body.username}, (err, musicianResult) => {
            if (err) {
                console.log(err);
                res.render('login', {alert: 'Internal Server Error! Try again later.'})

            } else {
                if (musicianResult) {
                    if (passwordHash.verify(password,musicianResult.password)) {
                        req.session.userId = musicianResult.id;
                        req.session.userName = musicianResult.name;
                        req.session.userImagePath= musicianResult.image;
                        console.log(req.session.userImagePath);
                        res.redirect('/feed');

                    } else {
                        res.render('login', {alert: 'Incorrect username or password. Check your credentials!'})

                    }
                } else {
                    res.render('login', {alert: 'Incorrect username or password. Check your credentials!'})
                }
            }
        }
    )
};

exports.changePassword = (req,res) => {
    res.render('changePassword');
}

exports.changePasswordPost = (req, res) => {
    Musician.findById(req.session.userId, (err, user) => {
        if (err) Common.error500(err, res);
        else {
           if (passwordHash.verify(req.body.oldPassword, user.password)) {
               if (req.body.newPassword == req.body.confirmPassword) {
                   user.password = passwordHash.generate(req.body.newPassword);
                   user.save((err, savedPassword) =>{
                       if(err){
                           console.log(err);
                       }
                   });
                   // redirect.
                   res.redirect('/feed');
               }
               else {
                   //Passwords dont match.
                   res.render('changePassword', {alert:'The passwords do not match, re-enter the credentials.'})
               }
           } else {
               // Old password invalid
               res.render('changePassword', {alert:'The current passwords is invalid, re-enter the password.'})
           }
        }
    });
}

exports.fetchAll = (req, res) => {
    Musician.find({}, (err, musicians) => {
        if (err) {}
        else {
            res.json({
                code: 200,
                musicians: musicians,
            })
        }
    })
}