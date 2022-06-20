const User = require('../db/models/user.model');

const get_personal_info = (req, res) => {
    // console.log(`this is the req.user ${req.user} hehehe`);
    // console.log(req.user._id);
    User.find({
        _id: req.user._id
    }).then((user) => {
        console.log(`this is the user ${user}`);
        res.status(200).json(user);
    }).catch((e) => {
        console.log(e);
    })
}

const update_personal_info = (req, res) => {
    console.log(`This is the request body ${req.body}`);
    User.findOneAndUpdate({ _id: req.user._id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    }).catch((e) => {
        console.log(e);
    })
}

const change_password = (req, res) => {
    const password = req.body.password
    console.log(password);
    User.findOne({
        _id: req.user._id
    }).then((user) => {
        if(user) {
            user.setPassword(password, function() {
                console.log('user password changed')
                user.save()
                res.status(200).json( { msg : 'The password has been changed' })
            })
        }  
    }).catch(e => {
        console.log(e);
    })
}


module.exports = {
    get_personal_info,
    update_personal_info,
    change_password
}