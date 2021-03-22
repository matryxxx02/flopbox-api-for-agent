import pathController from "../controllers/pathController.ts";
import serversController from "../controllers/serversController.ts";
import { Router } from "../utils/deps.ts";

const router = Router();
const pathUrl = "/:alias/:path(*)";
const serversDb = new serversController();

router.get(pathUrl, async (req, res) => {
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const url = (await serversDb.getOne(alias)).url;

  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port);
  try {
    console.log("ohshit", path);
    const data = await clientFtp.downloadFile(path);
    console.log("ohshit", data);
    res.setStatus(200).send(data);
  } catch (err) {
    console.error(err);
    if (err.code === 550) {
      res.setStatus(404).json("file or directory not exist.");
    } else {
      res.setStatus(500).json("Internal error.");
    }
  }
});

router.post(pathUrl, async (req, res) => {
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  console.log("PUSH NEW FILE");
  const file = req.body.file;
  console.log(file);
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }

  const clientFtp = new pathController(url, port);
  const data = await clientFtp.uploadFile(path, file);
  console.log(data);
  res.setStatus(200).json({
    success: "true",
    data: "camarche",
  });
});

router.put(pathUrl, async (req, res) => {
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const { newName } = req.body;
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port);
  //try catch
  await clientFtp.renameFile(path, newName);
  res.setStatus(200).json({
    success: "true",
    data: "camarche",
  });
});

router.delete(pathUrl, async (req, res) => {
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port);
  const data = await clientFtp.deleteFile(path);
  console.log(data);
  res.setStatus(200).json({
    success: "true",
    data: "camarche",
  });
});

export default router;
