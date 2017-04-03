"use strict";
const nunjucks = require('nunjucks');

// opts are passed direct to nunjucks
// with an additional 'ext' for extention
//  (a common suffix for templates)
module.exports = function(path, opts) {
  let env = nunjucks.configure(path, opts);

  const ext = opts.ext || '';

  const filters = opts.filters || {};
  Object.keys(filters).forEach(f => {
    env.addFilter(f, filters[f]);
  });

  const globals = opts.globals || {};
  Object.keys(globals).forEach(g => {
    env.addGlobal(g, globals[g]);
  });

  const extensions = opts.extensions || {};
  Object.keys(extensions).forEach(e => {
    env.addExtension(e, extensions[e]);
  });

  return (ctx, next) => {
    ctx.render = (view, context) => {
      return new Promise((resolve, reject) => {
        nunjucks.render(view+ext, context, (err, body) => {
          if (err)
            return reject(err);
          ctx.body = body;
          resolve();
        });
      });
    };

    return next();
  };
};
