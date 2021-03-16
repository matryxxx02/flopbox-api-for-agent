import db from "../utils/db.ts";
import Server from "../models/Server.ts";

//await servers.insertOne({ alias: "ubuntu", url: "ftp.ubuntu.com" });
//console.log(servers.findOne({ alias: "ubuntu" }));

export default class serversController {
  constructor(servers: Array<Server>) {
    this.servers = servers;
  }

  static async build(): Promise<serversController> {
    const servers = await db.getCollection<Server>("servers");
    console.log(servers);
    return new serversController(servers);
  }

  get servers(): Array<Server> {
    return this.servers;
  }

  set servers(servers: Array<Server>) {
    this.servers = servers;
  }
}
