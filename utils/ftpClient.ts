import { FTPClient } from "./deps.ts";

export class ftpClient {
  client: FTPClient;

  constructor(host: string, port: int) {
    this.client = new FTPClient(host, port);
  }

  connect() {}

  downloadFile() {}

  uploadFile() {}

  renameFile() {}

  deleteFile() {}

  printDir() {}

  renameDir() {}
}

// const client = new FTPClient("ftp.ubuntu.com");
// await client.connect();
// console.log("Connected");

// console.log("Downloading...");
// let file = await Deno.open("./5MB.ico", {
//   create: true,
//   write: true,
// });
// let stream = await client.downloadStream("/cdimage/favicon.ico");
// await Deno.copy(stream, file);
