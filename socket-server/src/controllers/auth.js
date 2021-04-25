const { response } = require('express');
const bcrypt       = require('bcryptjs');

const UserSchema = require('../models/userSchema');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    try {
        const { email, password } = req.body;

        // check email already exist
        const existeEmail = await UserSchema.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist'
            });
        }

        const user = new UserSchema( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with the administrator'
        });
    }
}

const login = async(req, res) => {

    const {  email, password } = req.body;

    try {
        // Check if the email exists in DB
        const userDB = await UserSchema.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        // Generate JWT
        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            usuer: userDB,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with the administrator'
        });
    }
}

const renewToken = async(req, res) => {

    const uid = req.uid;

    // Generate new JWT
    const token = await generateJWT( uid );

    // get user by UID
    const user = await UserSchema.findById( uid );

    res.json({
        ok: true,
        user,
        token,
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}
