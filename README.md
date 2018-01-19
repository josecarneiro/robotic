# Robotic

A robots.txt generating Express Middleware.

## Installation

    $ yarn add robotic

Alternatively, using npm

    $ npm install robotic

### Usage

To use Robotic in you Express app, simply load the module, provide it with a `rules` array and plug it into with the `app.use(...)` functionality.

```js
const robotic = require('robotic');

const app = require('express')();

const rules = [{
  agent: '*',
  allow: [ '/', '/user/*', '/job/*' ],
  disallow: [ '/api', '/settings' ]
}, {
  agent: 'Googlebot',
  allow: [ '/', '/user/*', '/job/*' ],
  disallow: [ '/api/search' ]
}, {
  sitemap: 'https://mydomain.com/sitemap.xml'
}];

app.use(robotic(rules));

app.listen(3000);
```

Now, by navigating to `127.0.0.1:3000/robots.txt`, you'll be served with a robots.txt page as configured:

```
User-agent: *
Allow: /
Allow: /user/*
Allow: /job/*
Disallow: /api
Disallow: /settings

User-agent: Googlebot
Allow: /
Allow: /user/*
Allow: /job/*
Disallow: /api/search

Sitemap: https://mydomain.com/sitemap.xml
```

### Testing

To run tests, simply execute the command `npm run test`.

## Author

[José Carneiro](https://josecarnei.ro) - Full-stack developer, living in sunny Lisbon, Portugal.

## License

The middleware `robotic` is licensed under the MIT License, meaning it's free to be used for any purpose.