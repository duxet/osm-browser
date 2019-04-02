const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const nunjucks = require('nunjucks');
const path = require('path');
const geoip = require('geoip-lite');

const app = new Koa();
app.proxy = true;

if (process.env.NODE_ENV === 'development') {
  koaWebpack()
    .then(middleware => app.use(middleware))
    .catch(error => console.error(error));
} else {
  const assetsPath = path.join(__dirname, '../dist');
  app.use(
    require('koa-static')(assetsPath, {})
  );
}

app.use(async (ctx, next) => {
  if (ctx.path !== '/') {
    return await next();
  }

  const geo = geoip.lookup(ctx.ip) || { ll: [47.413220, -1.219482] };
  const data = {
    serverData: JSON.stringify({
      pointsApiUrl: 'https://points.osm.ovh',
      coordinates: geo.ll,
    })
  };

  const filename = path.join(__dirname, 'index.html');
  ctx.body = nunjucks.render(filename, data);
});

app.listen(process.env.HTTP_PORT || 80);
console.info(`Server started in ${process.env.NODE_ENV} mode`)
