import { Drash } from "../utils/deps.ts";
import db from "../utils/db.ts";
import Server from "../models/Server.ts";
import pathController from "../controllers/pathController.ts";

export default class Path extends Drash.Http.Resource {
  static paths = ["/servers/:alias/?"];

  public GET() {
    console.log("path");
    const alias = String(this.request.getPathParam("alias"));
    const path = String(this.request.getPathParam("path"));
    console.log(String(this.request.getUrlPath(this.request)));
    console.log({ alias, path });

    // const collection = await db.getCollection<Server>("servers");
    // const url = collection.findOne({ alias }).url as string;
    // console.log(url);
    // const clientFtp = new pathController(url, 21);
    // clientFtp.connectToServer();
    // this.response.body = clientFtp.downloadFile(path);
    this.response.body = "okk";
    return this.response;
  }

  public POST() {
    console.log("PUSH NEW FILE");
    const file = this.request.getBodyFile("file");
    console.log(file);
    return this.response;
  }
  public PUT() {}
  public DELETE() {}
}
