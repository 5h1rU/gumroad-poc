const fetch = require('node-fetch');
const url = require('url');

module.exports = async (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers too */
  };
  const response = await fetch(`https://gumroad.com/products/${query.permalink}/display?permalink=${query.permalink}`);
  const proxy = await response.text();
  res.writeHead(200, headers);
  res.end(proxy);
};
