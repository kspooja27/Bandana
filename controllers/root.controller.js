
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
        res.render('feed');
        //res.send("User is logged in.")
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
