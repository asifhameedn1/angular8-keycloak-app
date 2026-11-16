// webpack-dev-server 2.4 (used by Angular CLI 1.0) requires spdy, whose
// http-deceiver dependency calls process.binding('http_parser'), which was
// removed in newer Node versions, so `ng serve` crashes on startup.
// spdy is only used for `ng serve --ssl`; plain HTTPS (HTTP/1.1) is fine there.
'use strict';

const https = require('https');

exports.createServer = function (options, app) {
  const httpsOptions = Object.assign({}, options);
  delete httpsOptions.spdy;
  return https.createServer(httpsOptions, app);
};
