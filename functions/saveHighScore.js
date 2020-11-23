require("dotenv").config();
const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method is not allowed." }),
    };
  }

  const { score, name } = JSON.parse(event.body);
  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }
  try {
    // get the records in the right order
    const records = await table
      .select({
        sort: [{ field: "score", direction: "desc" }],
      })
      .firstPage();

    // get rid of unecessary fields
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    // the records are ordered from highest to lowest
    // therefore, the lowest record is at index 9
    const lowestRecord = formattedRecords[9];
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
