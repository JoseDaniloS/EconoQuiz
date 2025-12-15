import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

dotenv.config();

const dynamoClient = new DynamoDBClient({
  // fromIni({ profile: "default" }),
  region: process.env.AWS_REGION,
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   sessionToken: process.env.AWS_SESSION_TOKEN,
  // },
});

const docClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});
export default docClient;
