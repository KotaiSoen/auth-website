const User = require('../db/models/user.model');

const get_personal_info = (req, res) => {
    console.log(req.user);
    User.find({
        _userId: req.user._id
    }).then((user) => {
        let email = user.email;
        let password = user.password;
        console.log(user);
        res.status(200).json(user);
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = {
    get_personal_info
}