import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class Servers extends Drash.Http.Resource {
  static paths = ["/servers/", "/servers/:alias"];

  public GET() {
    console.log("servers");
  }

  public POST() {}
}
