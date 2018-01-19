'use strict';

const dictionary = {
  allow: 'Allow',
  disallow: 'Disallow',
  agent: 'User-agent',
  delay: 'Crawl-delay',
  sitemap: 'Sitemap'
};

const make = (prop, value) => `${ dictionary[prop] }: ${ value }`;

module.exports = rules => {
  let list = [];
  for (const item of rules) {
    for (let prop in item) {
      if (item[prop] instanceof Array) {
        for (let subItem of item[prop]) {
          list.push(make(prop, subItem));
        }
      } else {
        list.push(make(prop, item[prop]));
      }
    }
    list.push('');
  }
  return list.join('\n');
};
