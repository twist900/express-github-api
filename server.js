'use strict'
const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });


/**
 * Create Express server.
 */
let app = express();


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);


/**
 * Primary app routes.
 */
app.get('/', (req, res) => {
	res.send('This is the home route');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
	console.log('%s Express server listening on port %d in %s mode.',
		chalk.green('✓'), app.get('port'), app.get('env'));
})

module.exports = app;