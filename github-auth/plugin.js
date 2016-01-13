var passport = require('passport');
var passportGithub = require('passport-github2');

var defaultConfig = require('./defaultConfig');

function create() {
    var pluginConfig = defaultConfig;

    var User = {
        findOrCreate: function(info) {
            var user = pluginConfig.users[info.id] || {
                id: info.id,
                profile: info.profile
            };
            return Promise.accept(user);
        }
    };

    function getConfig() {
        return pluginConfig;
    }

    function setConfig(config) {
        pluginConfig = config;
    }

    function info() {
        return require('../package.json');
    }

    function registerStrategy() {
        passport.use(new passportGithub.Strategy(pluginConfig.githubCredentials,
            function(accessToken, refreshToken, profile, done) {
                console.log('Github profile', profile, accessToken, refreshToken);
                User.findOrCreate({
                    id: profile.id,
                    profile
                }).then(function(user) {
                    return done(null, user);
                });
            }
        ));
    }

    function registerAuthRoutes(app) {
        var server = app.server;

        server.get('/auth/github/login',
            passport.authenticate('github', {
                scope: ['user:email']
            }));

        server.get('/auth/github/callback',
            passport.authenticate('github', {
                failureRedirect: '/login'
            }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });
    }

    function apply(app) {
        registerStrategy();
        registerAuthRoutes(app);

        app.enableAuthentication({
            name: 'github',
            url: '/auth/github/login'
        });
    }

    return {
        info,
        apply,
        getConfig,
        setConfig
    };
}

module.exports = create;