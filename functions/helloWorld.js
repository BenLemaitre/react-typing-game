// netlify will check for exports.handler
exports.handler = (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Hello World",
    }),
  };
};
