'use strict';

const express = require('express');
const supertest = require('supertest');

const robotic = require('./../.');

const options = {
  base: 'http://127.0.0.1:3040',
  rules: [{
    agent: '*',
    allow: [ '/', '/user/*', '/job/*' ],
    disallow: [ '/api', '/settings' ]
  }, {
    agent: 'Googlebot',
    allow: [ '/', '/user/*', '/job/*' ],
    disallow: [ '/api/search' ]
  }, {
    sitemap: 'https://mydomain.com/sitemap.xml'
  }]
};

const init = async () => {
  const app = express();
  app.use(robotic(options.rules));
  await app.listen(3040, () => Promise.resolve());
};

describe('Test robotic', () => {
  it('Should load middleware and serve robots.txt', async () => {
    await init();
    const request = supertest(options.base);
    return request
    .get('/robots.txt')
    .expect(200)
    .expect('Content-Type', /text\/plain/)
    .expect('Content-Length', '213')
    .expect('User-agent: *\nAllow: /\nAllow: /user/*\nAllow: /job/*\nDisallow: /api\nDisallow: /settings\n\nUser-agent: Googlebot\nAllow: /\nAllow: /user/*\nAllow: /job/*\nDisallow: /api/search\n\nSitemap: https://mydomain.com/sitemap.xml\n');
  });
});
