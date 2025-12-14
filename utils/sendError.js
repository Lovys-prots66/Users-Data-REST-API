const sendError = (res, statusCode, message) => {
  res.writeHead(statusCode, {'Message' : message.toString()});
  res.end();
}

export { sendError }