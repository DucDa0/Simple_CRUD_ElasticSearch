const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const insertDoc = async function (indexName, mappingType, data) {
  return await client.index({
    index: indexName,
    type: mappingType,
    body: data,
  });
};

module.exports = insertDoc;
