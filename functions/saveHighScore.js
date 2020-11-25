const { table, getHighScores } = require("./utils/airtable");
const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");

exports.handler = async (event, context) => {
  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: "Unauthorized" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method is not allowed." }),
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (typeof score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }
  try {
    const records = await getHighScores(false);

    // the records are ordered from highest to lowest
    // therefore, the lowest record is at index 9
    const lowestRecord = records[9];
    const lowestRecordScore = lowestRecord.fields.score;

    if (typeof lowestRecordScore === "undefined" || score > lowestRecordScore) {
      // update the lowest score with new score
      const updatedRecord = { id: lowestRecord.id, fields: { score, name } };
      await table.update([updatedRecord]);

      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Failed to save record." }),
    };
  }
};
