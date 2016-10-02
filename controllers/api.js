const GitHubApi = require("github");

const github = new GitHubApi({
    version: "3.0.0",
    protocol: "https",
    timeout: 5000
});

/**
 * GET /repos
 * Get public repos.
 */
exports.getRepos = (req, res, next) => {
  github.repos.getPublic({}, (err, repoList) => {
    if (err) { return next(err); }
    res.send(repoList);
  });
}