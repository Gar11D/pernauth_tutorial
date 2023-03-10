const express = require('express');
const app = express();
const {PORT, CLIENT_URL} = require ('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//import passport middleware
require('./middlewares/passport-middleware');

//import middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(passport.initialize());

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