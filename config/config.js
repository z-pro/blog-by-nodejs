var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'myblog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myblog'
  },

  test: {
    root: rootPath,
    app: {
      name: 'myblog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myblog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'myblog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myblog-production'
  }
};

module.exports = config[env];
