import { FTPClient, JSZip, Sha256 } from "../utils/deps.ts";
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
    const data = await this.client.download(path);
    return data;
  }

  /**
   * 
   * @param path directory path
   * @returns path of zipfile
   */
  async downloadDir(path: string): Promise<string> {
    const zip = new JSZip();
    const zipname = this.pathToName(path) + ".zip";
    await this.makeZip(path, zip);
    await zip.writeZip(zipname);
    return zipname;
  }

  /**
   * 
   * @param filepath 
   * @returns object contains filepath and his checksum (sha256) 
   */
  async getFileChecksum(filepath: string): Promise<object> {
    await this.connectToServer();
    const file = await this.client.download(filepath);
    return {
      filepath,
      file: new Sha256().update(file).toString(),
    };
  }

  /**
   * 
   * @param path 
   * @returns Array of object contains filepath and his checksum (sha256) 
   */
  async getAllFilesChecksum(path: string) {
    const checksums: object[] = [];
    await this.makeChecksum(path, checksums);
    return checksums;
  }

  /**
   * 
   * @param path 
   * @param folder recursive method for create zipfile
   */
  async makeZip(path: string, folder: JSZip) {
    const dir = await this.listDir(path);

    for (const filepath of dir) {
      if (filepath.includes(".")) {
        const file = await this.client.download(filepath);
        folder.addFile(this.pathToName(filepath), file);
      } else {
        const img = folder.folder(this.pathToName(filepath));
        await this.makeZip(filepath, img);
      }
    }
  }

  /**
   * Recursive method for create Array of objects contains checksum of each file
   * @param path 
   * @param listOfChecksum list of checksum (for each file)
   */
  async makeChecksum(path: string, listOfChecksum: Array<object>) {
    const dir = await this.listDir(path);

    for (const filepath of dir) {
      if (filepath.includes(".")) {
        const hashObj = await this.getFileChecksum(filepath);
        listOfChecksum.push(hashObj);
      } else {
        await this.makeChecksum(filepath, listOfChecksum);
      }
    }
  }

  /**
   * 
   * @param path 
   * @returns name of zip file
   */
  private pathToName(path: string): string {
    const splitPath = path.split("/");
    return splitPath.length > 1 && splitPath[1] != ""
      ? splitPath[splitPath.length - 1]
      : splitPath[0];
  }

  /**
   * For list all file of one directory
   * @param path 
   * @returns 
   */
  async listDir(path: string) {
    await this.connectToServer();
    return await this.client.list(path);
  }

  /**
   * For upload file in ftp server
   * @param path 
   * @param data 
   * @returns clientFTP result
   */
  async uploadFile(path: string, data: Uint8Array) {
    await this.connectToServer();
    return await this.client.upload(path, data);
  }

  /**
   * For rename file in ftp server
   * @param path 
   * @param newName 
   * @returns clientFTP result
   */
  async renameFile(path: string, newName: string) {
    await this.connectToServer();
    const pathArray = path.split("/");
    if (pathArray.length > 1 && pathArray[1] != "") {
      pathArray[pathArray.length - 1] = newName;
      const newPath = pathArray.join("/");
      await this.client.rename(path, newPath);
    } else {
      return await this.client.rename(path, newName);
    }
  }

  /**
   * For delete file or directory
   * @param path 
   * @returns clientFTP result
   */
  async deleteFile(path: string) {
    await this.connectToServer();
    return await this.client.rm(path);
  }
}
