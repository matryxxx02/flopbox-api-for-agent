import { FTPClient, JSZip } from "../utils/deps.ts";

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
    await this.client.connect();
  }

  /**
   * download
   * @param path 
   * @returns 
   */
  async downloadFile(path: string): Promise<Uint8Array> {
    await this.connectToServer();
    return await this.client.download(path);
  }

  async downloadDir(path: string) {
    const zip = new JSZip();
    await this.makeZip(path, zip);
    await zip.writeZip(this.pathToName(path) + ".zip");
    console.log(zip);
  }

  async makeZip(path: string, folder: JSZip) {
    const dir = await this.listDir(path);
    let i = 0;
    for (const filepath of dir) {
      i++;
      console.log(filepath);
      if (filepath.includes(".")) {
        const file = await this.client.download(filepath);
        folder.addFile(this.pathToName(filepath), file);
      } else {
        //appel recusif
        const img = folder.folder(this.pathToName(filepath));
        await this.makeZip(filepath, img);
      }
    }
  }

  private pathToName(path: string): string {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
  }

  async listDir(path: string) {
    await this.connectToServer();
    return await this.client.list(path);
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
