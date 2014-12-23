'use strict';

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

function browserSyncInit(baseDir, files, middleware, module) {
  if (module === undefined) {
    module = 'index';
  }
  browserSync.instance = browserSync.init(files, {
    startPath: '/' + module + '.html',
    server: {
      baseDir: baseDir,
      middleware: proxyMiddleware
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
gulp.task('serve', ['watch'], _.wrap('shell', serve));


// Serve distribution mode
//

function serveDist(module) {
  browserSyncInit(module + '-dist', null, proxyMiddleware);
}
gulp.task('serve:dist', ['build'], _.wrap('shell', serve));
