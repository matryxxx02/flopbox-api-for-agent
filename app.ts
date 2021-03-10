import { Drash, FTPClient, serve } from "./utils/deps.ts";
import { TodoList } from "./todo.ts";
import Servers from "./routes/servers.ts";
import Path from "./routes/path.ts";

const port = 8080;

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [Servers, Path],
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: "all",
    tag_string: "{datetime} | {level} |",
    tag_string_fns: {
      datetime() {
        return new Date().toISOString().replace("T", " ");
      },
    },
  }),
});

server.run({
  hostname: "localhost",
  port,
});
console.log(`SERVER HOST ON PORT ${port} ✅`);

// const s = serve({ port: 8000 });
// console.log("http://localhost:8000/");

// for await (const req of s) {
//   req.respond({ body: "DddffENO  ces morts\n" });
// }

// const client = new FTPClient("ftp.ubuntu.com");
// await client.connect();
// console.log("Connected");

// console.log("Downloading...");
// let file = await Deno.open("./5MB.ico", {
//     create: true,
//     write: true,
// });
// let stream = await client.downloadStream("/cdimage/favicon.ico");
// await Deno.copy(stream, file);
