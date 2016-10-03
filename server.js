'use strict'
const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const apiController = require('./controllers/api');

/**
 * Create Express server.
 */
let app = express();


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');
app.use(passport.initialize());

/**
 * API routes.
 */

const apiRoutes = require('./routes/api')(app, apiController);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/github', passport.authenticate('github', {scope: [ 'user:email' ]}));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
   const jwtToken = jwt.sign(req.user, process.env.APP_SECRET); 
   res.json({success: true, jwt_token: jwtToken});
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
	console.log('%s Express server listening on port %d in %s mode.',
		chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;