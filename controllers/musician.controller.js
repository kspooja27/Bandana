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
            console.log(err),
            res.status(500).json({
                code: 500,
                message: "Internal Server Error",
                error: err,
            });
        } else {
            let instruments = [];
            console.log(JSON.stringify(savedMusician))
            req.body.instruments.split('*,').forEach((instrument) => {
                let jsonInst = JSON.parse(instrument)
                console.log(jsonInst);
                instruments.push(jsonInst);
            });
            console.log(instruments);

            savedMusician.instruments = instruments;

            savedMusician.save((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        code: 500,
                        message: "Internal Server Error",
                        error: err,
                    });
                } else {
                    if(req.files) {

                    }
                    res.status(200).json({
                        code: 200,
                        message: "All OK, Data Successfully added to the database",
                    });
                }
            })

        }
    });

};

exports.login = (req, res) => {
    const password = req.body.password;
    Musician.findOne(isNaN(req.body.username) ? {email: req.body.username} : {phone: req.body.username}, (err, musicianResult) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Internal Server Error",
                });
            } else {
                if (musicianResult) {
                    if (passwordHash.verify(password,musicianResult.password)) {
                        res.status(200).json({
                            code: 200,
                            message: "User verified, all OK",
                            user: musicianResult,
                        });
                    } else {
                        res.status(401).json({
                            code: 401,
                            message: "Authentication error"
                        });
                    }
                } else {
                    res.status(404).json({
                        code: 404,
                        message: "User not found"
                    });
                }
            }
        }
    )
};

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