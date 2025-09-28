import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAME } from "../routes/AuthUser.js";
import docClient from "../config/database.js";

export async function verificarSeUsuarioExiste(userId) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "id-index",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": userId,
    },
    Limit: 1,
  });

  const response = await docClient.send(command);

  return response.Items[0];
}
