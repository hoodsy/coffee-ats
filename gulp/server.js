'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');
var _ = require('lodash');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://127.0.0.1:3000/'; // The location of your backend

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

/* proxyMiddleware forwards static file requests to BrowserSync server
   and forwards dynamic requests to your real backend */
function proxyMiddleware(req, res, next) {
  if (/api/.test(req.url)) {
    req.url = req.url.replace('api/', '');
    proxy.web(req, res);
  } else {
    next();
  }
}

/*
 * mockMiddleware forwards static file requests to BrowserSync server
 * and gets dynamic requests from local mock store
 */
var mockData = {};
function mockMiddleware(req, res, next) {

  if (/api/.test(req.url)) {
    var _id = null,
      url = req.url.split('?')[0].split('/');


    // Check if the last sub-path is an ID or entity type

    var last = url[url.length-1];

    var mockEntities = [
      'auth',
      'feed',
      'matches',
      'messages',
      'opportunities',
      'users'
    ];

    // Get the ID
    if (mockEntities.indexOf(last) === -1) {
      var _id = url.pop();
    }

    // Get the entity type, e.g. opportunities
    var entity = url.pop();

    // If <entity>.json data has not been loaded yet, read mock data and store
    if (mockData[entity] === undefined) {
      var mockPath = 'app/mock/';
      if (fs.existsSync('app/mongomock/')) {
        mockPath = 'app/mongomock/';
      }
      var jsonData = fs.readFileSync(mockPath + entity + '.json').toString();
      mockData[entity] = JSON.parse(jsonData);
    }

    var response = mockData[entity];

    // Lookup the _id from the stored mock data
    if (_id !== null) {
      response = _.find(mockData[entity], {_id: _id});
    }

    // Send a regular json response
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify(response));
    res.end();

  } else {
    next();
  }
}

function browserSyncInit(baseDir, files, middleware, module) {
  if (module === undefined) {
    module = 'index';
  }
  browserSync.instance = browserSync.init(files, {
    startPath: '/' + module + '.html',
    port: 8080,
    server: {
      baseDir: baseDir,
      middleware: middleware
    },
    browser: 'default'
  });
}


// Serve dev mode
//

function appFiles(module) {
  return appFiles = [
    path.join('app', module + '.html'),
    path.join('app', module + '-static', '**', '*'),
    'app/bower_components/**/*.js',
    'app/modules/**/*.js'
  ];
}

function serve(module) {
  browserSyncInit('app', appFiles(module), proxyMiddleware, module);
}
gulp.task('serve:proxy', ['watch'], _.wrap('shell', serve));

function serveMock(module) {
 browserSyncInit('app', appFiles(module), mockMiddleware, module);
}
gulp.task('serve', ['watch'], _.wrap('shell', serveMock));


// Serve distribution mode
//

function serveDist(module) {
  browserSyncInit(module + '-dist', null, proxyMiddleware, module);
}
gulp.task('serve:dist:proxy', ['build'], _.wrap('shell', serveDist));

function serveDistMock(module) {
  browserSyncInit(module + '-dist', null, mockMiddleware, module);
}
gulp.task('serve:dist', ['build'], _.wrap('shell', serveDistMock));
