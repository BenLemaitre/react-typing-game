// netlify will check for exports.handler
exports.handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Hello World",
    }),
  };
};
