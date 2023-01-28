const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
  console.log(event);
  const body = event.body;
  //const decodedBody = Buffer.from(body, 'base64').toString();
  //console.log(decodedBody);
  const data = JSON.parse(body);
  console.log(data);
  const params = {
    TableName: "website-visitors",
    Item: {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      createdAt: Date.now().toLocaleString()
    }
  };

  try {
    const client = new DynamoDBClient();
    const command = new PutItemCommand(params);
    await client.send(command);
    return { statusCode: 200, body: JSON.stringify(params.Item) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Failed to save data to DynamoDB" };
  }
};
