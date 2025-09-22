import { Client, Account, Databases, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_SITE_API_ENDPOINT)
  .setProject(process.env.APPWRITE_SITE_PROJECT_ID);


const tableDB = new TablesDB(client);

export { client, tableDB };
