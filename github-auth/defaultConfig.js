module.exports = {
    githubCredentials: {
        clientID: process.env.GITHUB_CLIENT_ID || 'github client id',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || 'github client secret',
        callbackURL: 'http://localhost:8080/auth/github/callback'
    }
};