const {
  getDocs,
  getDocById,
  createDoc,
  updateDoc,
  removeDoc,
  searchDoc,
  countDocs,
} = require('../utils/actionsDoc');

const index = 'product-index';
const type = 'product';

const getAll = async (req, res) => {
  try {
    await getDocs(index, type)
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
  const page = parseInt(req.query.page) || 1;
  try {
    const { body } = await countDocs(index, type);
    await searchDoc(
      index,
      type,
      {
        query: {
          match: {
            categoryId: req.params.id,
          },
        },
        sort: [
          {
            created: {
              order: 'desc',
            },
          },
        ],
      },
      page
    )
      .then((response) => {
        return res.json({ data: response.body.hits.hits, count: body.count });
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
    await getDocById(index, type, id)
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
  try {
    await createDoc(index, type, {
      productName,
      price,
      categoryId,
      created: Date.now(),
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

const update = async (req, res) => {
  const { productName, price, categoryId } = req.body;
  try {
    await updateDoc(
      index,
      type,
      {
        productName,
        price,
        categoryId,
      },
      req.params.id
    )
      .then((response) => {
        return res.json({
          message: 'Updated successfully!',
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
        return res.json({ message: 'Updated fail!' });
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
    await removeDoc(index, type, req.params.id)
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
  const page = parseInt(req.query.page) || 1;
  try {
    const { body } = await countDocs(index, type, {
      query: {
        wildcard: {
          productName: {
            value: `*${req.query.q}*`,
          },
        },
      },
    });
    await searchDoc(
      index,
      type,
      {
        query: {
          wildcard: {
            productName: {
              value: `*${req.query.q}*`,
            },
          },
        },
        sort: [
          {
            created: {
              order: 'desc',
            },
          },
        ],
      },
      page
    )
      .then((response) => {
        return res.json({
          data: response.body.hits.hits,
          count: body.count,
        });
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

module.exports = {
  getAll,
  getByCatId,
  getById,
  create,
  update,
  remove,
  search,
};
