const express = require('express');
const app = express();
const {PORT} = require ('./constants');

//import middlewares
app.use(express.json());

//import routes
const authRoutes = require('./routes/auth');

//initialise routes
app.use('/api', authRoutes);

//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`the app is running at PORT ${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

appStart();