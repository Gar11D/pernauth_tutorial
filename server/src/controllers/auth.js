const db = require('../db');
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try{
        const {rows} = await db.query('SELECT user_id, email FROM users');
        return res.status(200).json({
            success: true,
            users: rows
        })
    } catch(err) {
        console.log(err.message)
    }
}

exports.register = async (req, res) => {
    const {email, password} = req.body;
    try{
        const hashedPassword = await hash(password, 10);
        await db.query('INSERT INTO users (email, password) VALUES ($1 , $2)', [email, hashedPassword]);
        return res.status(201).json({
            success: true,
            message: 'the registration was successful'
        })
    } catch(err) {
        console.log(err.message)
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.login = async (req, res) => {
    try{

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            error: err.message
        })
    }
}