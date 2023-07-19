import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

const dynamoDB = new DynamoDBClient({ region: 'ap-south-1', credentials:{accessKeyId: process.env.AWS_ACCESS_KEY,secretAccessKey: process.env.AWS_SECRET_KEY }});
const documentClient = DynamoDBDocumentClient.from(dynamoDB);

const Tables = {
  PRODUCTS: 'products',
  CATEGORY: 'category',
};

export { dynamoDB,documentClient, Tables };
