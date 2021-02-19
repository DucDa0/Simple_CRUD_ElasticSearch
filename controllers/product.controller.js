const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const index = 'product-index';
const type = 'product';

const getAll = async (req, res) => {
  try {
    await client
      .search({
        index,
      })
      .then((response) => {
        return res.json(response.body.hits.hits);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          return res.json([]);
        }
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

const getByCatId = async (req, res) => {
  try {
    await client
      .search({
        index,
        body: {
          query: {
            match: {
              categoryId: req.params.id,
            },
          },
        },
      })
      .then((response) => {
        return res.json(response.body.hits.hits);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          return res.json([]);
        }
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

const getById = async (req, res) => {
  try {
    await client
      .get({
        id: req.params.id,
        index,
      })
      .then((response) => {
        return res.json(response.body._source);
      })
      .catch((err) => {
        return res.status(404).json({ message: 'Not Found!' });
      });
  } catch (err) {
    console.log(err.message);
    if (err.meta.statusCode === 404) {
      return res.status(404).json({ message: 'Index not found!' });
    }
    return res.status(500).send('Server Error');
  }
};

const create = async (req, res) => {
  const { productName, price, categoryId } = req.body;
  const created = Date.now();
  try {
    await client
      .index({
        index,
        body: {
          productName,
          price,
          categoryId,
          created,
        },
      })
      .then((response) => {
        return res.json({
          message: 'Created successfully!',
          data: {
            _id: response.body._id,
            _source: { productName, price, categoryId },
          },
        });
      })
      .catch((err) => {
        return res.json({ message: 'Created fail!' });
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

const edit = async (req, res) => {
  const { productName, price, categoryId } = req.body;
  try {
    await client
      .update({
        index,
        id: req.params.id,
        body: {
          doc: {
            productName,
            price,
            categoryId,
          },
        },
      })
      .then((response) => {
        return res.json({
          message: 'Edited successfully!',
          data: {
            _id: response.body._id,
            _source: { productName, price, categoryId },
          },
        });
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          return res.status(404).json({ message: 'Not Found!' });
        }
        return res.json({ message: 'Edited fail!' });
      });
  } catch (err) {
    console.log(err.message);
    if (err.meta.statusCode === 404) {
      return res.status(404).json({ message: 'Index not found!' });
    }
    return res.status(500).send('Server Error');
  }
};

const remove = async (req, res) => {
  try {
    await client
      .delete({
        index,
        id: req.params.id,
      })
      .then((response) => {
        return res.json({ message: 'Deleted successfully!' });
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          return res.status(404).json({ message: 'Not Found!' });
        }
        return res.json({ message: 'Deleted fail!' });
      });
  } catch (err) {
    console.log(err.message);
    if (err.meta.statusCode === 404) {
      return res.status(404).json({ message: 'Index not found!' });
    }
    return res.status(500).send('Server Error');
  }
};

const search = async (req, res) => {
  try {
    await client
      .search({
        index,
        body: {
          query: {
            wildcard: {
              productName: {
                value: `*${req.query.q}*`,
              },
            },
          },
        },
      })
      .then((response) => {
        return res.json(response.body.hits.hits);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          return res.json([]);
        }
      });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

module.exports = { getAll, getByCatId, getById, create, edit, remove, search };
