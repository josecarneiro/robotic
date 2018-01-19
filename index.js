'use strict';

// DEPENDENCIES
const render = require('./render');

module.exports = rules => {
  return (req, res, next) => {
    if (req.url !== '/robots.txt') return next();
    res.header('Content-Type', 'text/plain').send(render(rules));
  };
};
