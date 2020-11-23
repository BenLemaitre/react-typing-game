const { table, getHighScores } = require("./utils/airtable.js");

exports.handler = async (event, context) => {
  try {
    const records = await getHighScores(true);

    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Failed to query records." }),
    };
  }
};
