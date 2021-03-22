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

  /**
   * connect to FTP server 
   */
  async connectToServer() {
    await this.connectToServer();
    await this.client.connect();
  }

  /**
   * download 
   * @param path 
   * @returns 
   */
  async downloadFile(path: string) {
    await this.connectToServer();
    return await this.client.download(path);
  }

  /**
   *  
   * @param path 
   * @param data 
   * @returns 
   */
  async uploadFile(path: string, data: Uint8Array) {
    await this.connectToServer();
    return await this.client.upload(path, data);
  }

  /**
   * 
   * @param path 
   * @param newName 
   * @returns 
   */
  async renameFile(path: string, newName: string) {
    await this.connectToServer();
    return await this.client.rename(path, newName);
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  async deleteFile(path: string) {
    await this.connectToServer();
    return await this.client.rm(path);
  }
}
