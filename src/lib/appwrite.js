// lib/appwrite.ts

import { Client, Account, TablesDB } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68ced71e003dece646b5');

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export { ID } from "appwrite";
