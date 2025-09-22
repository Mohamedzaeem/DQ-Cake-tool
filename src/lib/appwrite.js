import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('68ced71e003dece646b5');


const tableDB = new TablesDB(client);

export { client, tableDB };
