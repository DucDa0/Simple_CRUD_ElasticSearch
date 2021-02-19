const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const createIndex = async function (req, res) {
  const { indexName } = req.body;
  try {
    await client.indices
      .create({
        index: indexName,
      })
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};
const addmappingToIndex = async function (req, res) {
  const { indexName, mappingType, mapping } = req.body;
  try {
    await client.indices
      .putMapping({
        index: indexName,
        type: mappingType,
        include_type_name: true,
        body: mapping,
      })
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = { createIndex, addmappingToIndex };
