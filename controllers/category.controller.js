const {
  getDocs,
  getDocById,
  createDoc,
  updateDoc,
  removeDoc,
  searchDoc,
} = require('../utils/actionsDoc');

const index = 'category-index';
const type = 'category';

const getAll = async (req, res) => {
  try {
    await getDocs(
      index,
      type
      //   {
      //   sort: [
      //     {
      //       'categoryName.keyword': {
      //         order: 'desc',
      //       },
      //     },
      //   ],
      // }
    )
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
  const { categoryName } = req.body;
  try {
    await createDoc(index, type, {
      categoryName,
      created: Date.now(),
    })
      .then((response) => {
        return res.json({
          message: 'Created successfully!',
          data: { _id: response.body._id, _source: { categoryName } },
        });
      })
      .catch((err) => {
        return res.json({ message: 'Created fail!' });
      });
  } catch (err) {
    console.log(err.message);
    if (err.meta.statusCode === 404) {
      return res.status(404).json({ message: 'Index not found!' });
    }
    return res.status(500).send('Server Error');
  }
};

const update = async (req, res) => {
  const { categoryName } = req.body;
  try {
    await updateDoc(
      index,
      type,
      {
        categoryName,
      },
      req.params.id
    )
      .then((response) => {
        return res.json({ message: 'Updated successfully!' });
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
  try {
    await searchDoc(index, type, {
      query: {
        wildcard: {
          categoryName: {
            value: `*${req.query.q}*`,
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

module.exports = { getAll, getById, create, update, remove, search };
