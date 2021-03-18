import { FTPClient } from "../utils/deps.ts";

export default class pathController {
  client: FTPClient;

  constructor(
    host: string,
    port: number,
    user?: string,
    pass?: string,
    mode?: "active" | "passive",
  ) {
    this.client = new FTPClient(host, { port, user, pass, mode });
  }

  async connectToServer() {
    await this.client.connect();
    console.log("Connected");
  }

  async downloadFile(path: string) {
    return await this.client.download(path);
  }

  async uploadFile(path: string, data: Uint8Array) {
    return await this.client.upload(path, data);
  }

  async renameFile(path: string, newName: string) {
    return await this.client.rename(path, newName);
  }

  async deleteFile(path: string) {
    return await this.client.rm(path);
  }
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
