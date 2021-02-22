const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const getDocs = async (indexName, mappingType, payload) => {
  return await client.search({
    index: indexName,
    type: mappingType,
    body: payload,
  });
};

const getDocById = async (indexName, mappingType, id) => {
  return await client.get({
    index: indexName,
    type: mappingType,
    id,
  });
};

const createDoc = async (indexName, mappingType, data) => {
  return await client.index({
    index: indexName,
    type: mappingType,
    body: data,
  });
};

const updateDoc = async (indexName, mappingType, data, id) => {
  return await client.update({
    index: indexName,
    type: mappingType,
    id,
    body: {
      doc: data,
    },
  });
};

const removeDoc = async (indexName, mappingType, id) => {
  return await client.delete({
    index: indexName,
    type: mappingType,
    id,
  });
};

const limit = 6;
const searchDoc = async (indexName, mappingType, payload, page) => {
  return await client.search({
    index: indexName,
    type: mappingType,
    body: payload,
    from: (page - 1) * limit,
    size: page * limit,
  });
};

const countDocs = async (indexName, mappingType, payload) => {
  return await client.count({
    index: indexName,
    type: mappingType,
    body: payload,
  });
};

module.exports = {
  getDocs,
  countDocs,
  getDocById,
  updateDoc,
  removeDoc,
  createDoc,
  searchDoc,
};
