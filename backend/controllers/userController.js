const User = require('../db/models/user.model');

const get_personal_info = (req, res) => {
    console.log(`this is the req.user ${req.user}`);
    User.findOne({
        _userId: req.user._id
    }).then((user) => {
        console.log(user);
        res.status(200).json(user);
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = {
    get_personal_info
}