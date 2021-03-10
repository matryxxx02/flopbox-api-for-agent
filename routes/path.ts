import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class Path extends Drash.Http.Resource {
  static paths = ["/servers/:alias/:path"];

  public GET() {
    console.log("path");
  }
  public POST() {}
  public PUT() {}
  public DELETE() {}
}
