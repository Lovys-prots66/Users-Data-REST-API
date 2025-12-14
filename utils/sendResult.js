const toJSON = (item) => {
  return JSON.stringify(item);
}

const sendResult = (res, statusCode, data, cache = 'no-cache') => {
  res.writeHead(statusCode, {'Content-Type' : 'application/json', 'Cache-Control' : cache});
  res.end(toJSON(data));
}

export { sendResult }