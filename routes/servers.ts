import { Drash } from "../utils/deps.ts";
import db from "../utils/db.ts";
import Server from "../models/Server.ts";
//import serversController from "../controllers/serversController.ts";

export default class Servers extends Drash.Http.Resource {
  static paths = ["/servers/:alias?"];

  public async GET() {
    const servers = await db.getCollection<Server>("servers");
    this.response.body = servers.findMany((server: Server) =>
      server.url != null
    ).value();
    return this.response;
  }

  public async PUT() {
    const alias = String(this.request.getPathParam("alias"));
    const url = String(this.request.getBodyParam("url"));
    const collection = await db.getCollection<Server>("servers");
    const servers = collection.findMany((server: Server) =>
      server.alias == alias
    )
      .value();

    if (servers.length === 0) {
      throw new Drash.Exceptions.HttpException(
        404,
        "Not found resource",
      );
    }

    if (!url) {
      throw new Drash.Exceptions.HttpException(
        400,
        "This resource require the `:url` body param",
      );
    }

    await collection.updateOne(
      (el: Server) => el.alias === alias,
      { url },
    );
  }

  public async POST() {
    const alias = String(this.request.getBodyParam("alias"));
    const url = String(this.request.getBodyParam("url"));

    if (!alias || !url) {
      throw new Drash.Exceptions.HttpException(
        400,
        "This resource requires the `:alias` and `:url` body param",
      );
    }

    const collection = await db.getCollection<Server>("servers");
    const servers = collection.findMany((server: Server) =>
      server.alias == alias
    )
      .value();

    if (servers.length > 0) {
      throw new Drash.Exceptions.HttpException(
        409,
        "This resource already exist",
      );
    }

    await collection.insertOne({ alias, url });
    this.response.body = "Server added";
    this.response.status_code = 201;
    return this.response;
  }

  public async DELETE() {
    const alias = String(this.request.getPathParam("alias"));
    const collection = await db.getCollection<Server>("servers");
    try {
      await collection.deleteOne({ alias });
    } catch (err) {
      console.error(err);
      //TODO: if server not exist
      throw new Drash.Exceptions.HttpException(
        500,
        "Internal error",
      );
    }

    this.response.status_code = 204;
    return this.response;
  }
}
