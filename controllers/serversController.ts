import db from "../utils/db.ts";
import Server from "../models/Server.ts";

export default class serversController {
  async getAll(): Promise<Array<Server>> {
    const serversCollection = await db.getCollection<Server>("servers");
    return serversCollection.findMany((server: Server) => server.url != null)
      .value();
  }

  async getOne(alias: string): Promise<Server> {
    const serversCollection = await db.getCollection<Server>("servers");
    return serversCollection.findOne({ alias });
  }

  async insertOne(alias: string, url: string): Promise<void> {
    const serversCollection = await db.getCollection<Server>("servers");
    await serversCollection.insertOne({ alias, url });
  }

  async updateOne(alias: string, server: Server): Promise<void> {
    const serversCollection = await db.getCollection<Server>("servers");
    await serversCollection.updateOne(
      (el: Server) => el.alias === alias,
      server,
    );
  }

  async deleteOne(alias: string): Promise<void> {
    const serversCollection = await db.getCollection<Server>("servers");
    await serversCollection.deleteOne({ alias });
  }
}
