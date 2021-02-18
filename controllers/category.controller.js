const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const index = 'category-index';

const getAll = async (req, res) => {
  try {
    const { body } = await client.search({
      index,
    });
    return res.json(body.hits.hits);
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
    return res.status(500).send('Server Error');
  }
};

const create = async (req, res) => {
  const { categoryName } = req.body;
  try {
    await client
      .index({
        index,
        body: {
          categoryName,
        },
      })
      .then((response) => {
        return res.json({ message: 'Created successfully!' });
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
  const { categoryName } = req.body;
  try {
    await client
      .update({
        index,
        id: req.params.id,
        body: {
          doc: {
            categoryName,
          },
        },
      })
      .then((response) => {
        return res.json({ message: 'Edited successfully!' });
      })
      .catch((err) => {
        return res.json({ message: 'Edited fail!' });
      });
  } catch (err) {
    console.log(err.message);
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
        return res.json({ message: 'Deleted fail!' });
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

const search = async (req, res) => {
  try {
    const { body } = await client.search({
      index,
      body: {
        query: {
          match: {
            categoryName: {
              query: req.query.q,
              fuzziness: 2,
            },
          },
        },
      },
    });
    return res.json(body.hits.hits);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = { getAll, getById, create, edit, remove, search };
