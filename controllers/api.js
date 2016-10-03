const GitHubApi = require("github");
const redis = require('redis');
const redisClient = redis.createClient();

const github = new GitHubApi({
    version: "3.0.0",
    protocol: "https",
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    key: process.env.GITHUB_ID,
    secret: process.env.GITHUB_SECRET
})

/**
 * GET /repos
 * Get public repos.
 */
exports.getRepos = (req, res, next) => {
  redisClient.get(req.url, (error, result) => {
    if(result){
      res.send(JSON.parse(result));
    } else {
      github.repos.getPublic({}, (err, repoList) => {
        if (err) { 
          res.status(err.code).json({ message: JSON.parse(err.message).message });
          return next();  
        }
        let resultList = repoList.map( repo => { 
          return {
            id: repo.id,
            name: repo.name,
          }
        }) 
        redisClient.setex(req.url, 60, JSON.stringify(resultList));
        res.send(resultList);
      });
    }
  });
}

/**
 * GET /repos/:id
 * Get a single repo by id.
 */
exports.getRepo = (req, res, next) => {
  redisClient.get(req.url, (error, result) => {
    if(result){ 
      res.send(JSON.parse(result));
    } else {  
      github.repos.getById({ id: req.params.id }, (err, repo) => {
        if (err) { 
          res.status(err.code).json({ message: JSON.parse(err.message).message });
          return next(); 
        }
        let result = {
          id: repo.id,
          user: {
            login: repo.owner.login,
            id: repo.owner.id,
          },
          name: repo.name,
          description: repo.description,
          pushed_at:  repo.pushed_at,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
        }
        
        redisClient.setex(req.url, 60, JSON.stringify(result));
        res.send(result);
      });
    }
  });
}

/**
 * GET /repos/search/:query
 * Search repositories.
 */
exports.searchRepos = (req, res, next) => {
  redisClient.get(req.url, (error, result) => {
    if(result) {
      res.send(JSON.parse(result));
    } else {   
      github.search.repos({
        q: req.params.query,
      }, function(err, searchResults) {
        if (err) { 
          res.status(err.code).json({ message: JSON.parse(err.message).message });
          return next(); 
        }
        let resultList = [];
        if(searchResults.items){
          resultList = searchResults.items.map( repo => { 
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description
            }
          })
        } 

        redisClient.setex(req.url, 60, JSON.stringify(resultList));
        res.send(resultList);
      });
    }
  });
}