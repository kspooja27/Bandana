exports.error500 = (err, res) => {
    console.log(err);
    res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        err: err,
    });
}