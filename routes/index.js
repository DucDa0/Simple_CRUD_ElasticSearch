const category = require('./category.route');
const product = require('./product.route');
const route = (app) => {
  app.use('/api/categories', category);
  app.use('/api/products', product);
};
module.exports = { route };
