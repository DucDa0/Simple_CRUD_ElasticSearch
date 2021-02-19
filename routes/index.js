const category = require('./category.route');
const product = require('./product.route');
const init = require('./init.route');
const route = (app) => {
  app.use('/api/categories', category);
  app.use('/api/products', product);
  app.use('/api/init', init);
};
module.exports = { route };
