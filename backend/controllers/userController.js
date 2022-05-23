const { response } = require('express');
const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken');


const sign_up = (req, res) => {
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return {accessToken, refreshToken}
        })
    }).then((authTokens) => {
        res 
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            })
        }).then((authTokens) => {
            res 
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    })
}

const get_access_token = (req, res) => {
    req.userObject.generateAccessAuthToken().then(accessToken => {
        res.header('x-access-token', accessToken).send({ accessToken })
    }).catch(e => {
        res.status(400).send(e);
    })
}

const verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;    

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                "error": "Refresh token has expired or the session is invalid"
            })
        }
    }).catch((e) => {
        response.status(401).send(e);
    })
}

const authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err)
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}

const get_personal_info = (req, res) => {
    User.find({
        _userId: req.user_id
    }).then((user) => {
        let email = user.email;
        let password = user.password;
        res.status(200).json(user);
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = {
    sign_up,
    login,
    verifySession,
    get_access_token,
    authenticate,
    get_personal_info
}