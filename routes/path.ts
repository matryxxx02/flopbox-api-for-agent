import { Drash } from "../utils/deps.ts";

export default class Path extends Drash.Http.Resource {
  static paths = ["/servers/:alias/:path"];

  public GET() {
    console.log("path");
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
