const category = require('./category.route');
const route = (app) => {
  app.use('/api/categories', category);
};
module.exports = { route };
