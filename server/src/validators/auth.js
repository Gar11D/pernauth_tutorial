const {check} = require('express-validator');
const db = require('../db');
const {compare} = require('bcryptjs');

//password
const password = check('password').isLength({min: 6, max: 15}).withMessage('Password must be between 6 and 15 characters.')

//email
const email = check('email').isEmail().withMessage('please enter a valid email address')

//check if email exists
const emailExists = check('email').custom(async (value) => {
    const {rows} = await db.query ('SELECT * FROM users WHERE email = $1',[
    value,
    ])

    if(rows.length){
        throw new Error('that email is already registered.')
    }
})

//login validation
const loginFieldsCheck = check('email'). custom(async(value, {req}) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [value]);
    if(!user.rows.length) {
        throw new Error('email is not registered')
    }
    const validPassword = await compare(req.body.password, user.rows[0].password);
    if (!validPassword) {
        throw new Error('Invalid password entry')
    }
})

module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck]
}