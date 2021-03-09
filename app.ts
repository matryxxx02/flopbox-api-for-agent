import { Drash, FTPClient, serve } from "./deps.ts";
import { TodoList } from "./todo.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [TodoList],
});

server.run({
  hostname: "localhost",
  port: 8080,
});
console.log("SERVER REDAY ✅");
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
