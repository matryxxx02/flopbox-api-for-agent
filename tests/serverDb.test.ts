import { assertEquals } from "../utils/deps.ts";
import serversController from "../controllers/serversController.ts";

const serversDb = new serversController();
const freeModel = { alias: "free", url: "ftp.free.fr" };

Deno.test("test adding new server in DB", async function (): Promise<void> {
  await serversDb.insertOne("free", "ftp.free.fr");
  const free = await serversDb.getOne("free");
  assertEquals(free.alias, freeModel.alias);
  assertEquals(free.url, freeModel.url);
});

Deno.test("test  get servers in DB", async function (): Promise<void> {
  const servers = await serversDb.getAll();
  assertEquals(
    servers.find((server) => server.alias === "free")?.url,
    freeModel.url,
    "Expected the free server to be in the Array of servers",
  );
});

Deno.test("test modify server in DB", async function (): Promise<void> {
  freeModel.url = "ftp.free.com";
  await serversDb.updateOne("free", freeModel);
  const newUrl = (await serversDb.getOne("free")).url;
  assertEquals(newUrl, freeModel.url);
});

Deno.test("test delete server in DB", async function (): Promise<void> {
  await serversDb.deleteOne("free");
  const server = await serversDb.getOne("free");
  console.log(server);
  assertEquals(server, undefined);
});
