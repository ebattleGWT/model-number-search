const Shopify = require('@shopify/shopify-api');

module.exports = async function (event) {
  const client = event.shopifyClient;
  const searchQuery = event.queryStringParameters.query;

  // Build the search query to include the model-number metafield
  const metafieldQuery = `metafield.model_number.model-number:${searchQuery}`;

  const { data } = await client.get({
    path: 'search',
    query: {
      query: `${searchQuery}+${metafieldQuery}`,
      query_type: 'product',
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
