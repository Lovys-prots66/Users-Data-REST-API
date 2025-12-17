const toJSON = (item) => JSON.stringify(item);

const sendResult = (res, statusCode, data, cache = 'no-cache') => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': cache
  });
  res.end(toJSON(data));
};

const sendError = (res, statusCode, message) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  res.end(toJSON({ error: message }));
};

export { sendResult, sendError };