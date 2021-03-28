import pathController from "../controllers/pathController.ts";
import serversController from "../controllers/serversController.ts";

import { Router } from "../utils/deps.ts";
import findServer from "../middlewares/findServer.ts";

const router = Router();
const pathUrl = "/:alias/:path(*)?";
const serversDb = new serversController();
const handleError = (res: any, err: any) => {
  console.error(err);
  switch (err?.code) {
    case 550:
      throw res.setStatus(404).json("file or directory not exist.");
    case 530:
      throw res.setStatus(401).json(err?.message);
    default:
      throw res.setStatus(500).json("Internal error.");
  }
};

router.get(pathUrl, findServer, async (req: any, res: any) => {
  const { path } = req.params;
  const action = req.query.action || "list";

  if (!["list", "dl"].includes(action)) {
    throw res.setStatus(400).json(
      "action param only accept 'dl' and 'list' value",
    );
  }

  const file = path?.includes(".") || "";
  try {
    let data;
    if (file) {
      data = await req.clientFtp.downloadFile(path);
      res.setStatus(200).send(data);
    } else {
      if (action === "dl") {
        data = await req.clientFtp.downloadDir(path);
        await res.download(data);
        Deno.remove(data);
      } else {
        data = await req.clientFtp.listDir(path);
        res.setStatus(200).send(data);
      }
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.post(pathUrl, async (req: any, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  console.log("PUSH NEW FILE");
  const file = req.file;
  console.log(req, req.r.buf);
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }

  const clientFtp = new pathController(url, port, login, password);
  try {
    const data = await clientFtp.uploadFile(path, file);
    console.log(data);
    res.setStatus(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

router.put("/:alias/:path(*)", async (req, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const { newName } = req.body;
  const url = (await serversDb.getOne(alias)).url;
  if (!newName) {
    throw res.setStatus(400).json("newName is required.");
  }
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port, login, password);
  try {
    await clientFtp.renameFile(path, newName);
    res.setStatus(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

router.delete("/:alias/:path(*)", async (req, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port, login, password);
  try {
    const data = await clientFtp.deleteFile(path);
    res.setStatus(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
