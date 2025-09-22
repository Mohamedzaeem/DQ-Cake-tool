import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('68ced71e003dece646b5')
  .setDevKey('standard_1209e67e1abbdb813b4e5dd09850668a034cc0bb5ad7e669f685b6666eafbc9d4e49ff5612040e651f25c9fa750bf55db4a5342ec49d36aa18d63fc54e52dadd9b7f353f5396a7e5960e40f3aa307e71c36503c65c7e5904b86b723ad9d0ffe7ab8b13da8201dfb26bd017cd5d36746ac9dad012c7ddc0911f14b085d3f3e142');


const tableDB = new TablesDB(client);

export { client, tableDB };
