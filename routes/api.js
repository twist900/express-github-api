const passport = require('passport');

const apiRoutes = (app, apiController) => {
  app.get('/repos', passport.authenticate('jwt', { session: false}), apiController.getRepos);
  app.get('/repos/:id', passport.authenticate('jwt', { session: false}), apiController.getRepo);
  app.get('/repos/search/:query', passport.authenticate('jwt', { session: false}), apiController.searchRepos); 
}

module.exports = apiRoutes;