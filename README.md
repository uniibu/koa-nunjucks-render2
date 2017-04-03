koa-nunjucks-render2
------------
[![Node version](https://img.shields.io/node/v/koa-nunjucks-render2.svg?style=flat)](http://nodejs.org/download/)
[![Koajs deps](https://img.shields.io/badge/Koajs-2.2.0-brightgreen.svg)](https://github.com/koajs/koa)

** Updated fork of koa-nunjucks-render https://github.com/ohomer/koa-nunjucks-render for use with latest Koajs@2.x.x and Nodejs 7.x.x

Fast koa middleware for using nunjucks, that allows you to easily and efficiently render nunjucks templates.


If you're using nunjucks with koa, you'll find a few notable improvements over koa-views

* Faster
* Does not overwrite some of the rendering context variables (e.g. 'engine', 'cache')
* Directly uses nunjucks, so you have to learn the abstraction idiosyncrasies.
   Like for instance when using koa-views there's two layers of caching, one for
   directly rendered file, but the included files use nunjucks caching. By default
   in development their behaviors diverge (nunjucks caches all files, but
     koa-views reloads the top level file each load).

Install
=======

    npm install --save koa-nunjucks-render2


Example usage:

    var nunjucks = require('koa-nunjucks-render');

    app.use(nunjucks('views', {
      ext: '.html',
      noCache: process.env.NODE_ENV !== 'production',
      throwOnUndefined: true,
      filters: {
        json: function(str) {
          return JSON.stringify(str, null, 2);
        }
      },
      globals: {
        version: 'v8.0.1'
      },
      extensions: {
        MyExtension: new MyExtension()
      }
    }));

Note: the configuration object is passed directly to `nunjucks`.

It adds the additional (onptioanl) configurations:

*  `ext` which allows you to specify a common suffix to your templates.
*  `filters` an object of filter names and filters functions
*  `globals` an object of globals to add
*  `extensions` an object of extensions to add


And using it is also very clean:

      app.use(async ctx => {
        await ctx.render('template', {
             message: 'Hello World!',
             engine: 'Thomas The Tank'
             helicopter: true
           });
      });
