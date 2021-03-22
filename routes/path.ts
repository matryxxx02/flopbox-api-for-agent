import pathController from "../controllers/pathController.ts";
import serversController from "../controllers/serversController.ts";
import { Router } from "../utils/deps.ts";

const router = Router();
const pathUrl = "/:alias/:path(*)?";
const serversDb = new serversController();
const handleError = (res: any, err: any) => {
  console.error(err);
  switch (err?.code) {
    case 550:
      return res.setStatus(404).json("file or directory not exist.");
    case 530:
      return res.setStatus(401).json(err?.message);
    default:
      return res.setStatus(500).json("Internal error.");
  }
};

router.get(pathUrl, async (req, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const action = req.query.action || "list";
  const url = (await serversDb.getOne(alias))?.url;

  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  if (!["list", "dl"].includes(action)) {
    throw res.setStatus(400).json(
      "action param only accept 'dl' and 'list' value",
    );
  }

  const clientFtp = new pathController(url, port, login, password);
  const file = path.includes(".");
  try {
    let data;
    if (file) {
      data = await clientFtp.downloadFile(path);
    } else {
      if (action === "dl") {
        console.log("dl");
        //TODO : send a zip file of dir
        await clientFtp.downloadDir(path);
        data = "zip";
      } else {
        data = await clientFtp.listDir(path);
      }
    }
    res.setStatus(200).send(data);
  } catch (err) {
    handleError(req, err);
  }
});

router.post(pathUrl, async (req, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  console.log("PUSH NEW FILE");
  const file = req.body.file;
  console.log(file);
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }

  const clientFtp = new pathController(url, port, login, password);
  try {
    const data = await clientFtp.uploadFile(path, file);
    console.log(data);
    res.setStatus(200).json({
      success: "true",
      data: "camarche",
    });
  } catch (err) {
    handleError(req, err);
  }
});

router.put(pathUrl, async (req, res) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias, path } = req.params;
  const port = req.query.port || 21;
  const { newName } = req.body;
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  const clientFtp = new pathController(url, port, login, password);
  try {
    await clientFtp.renameFile(path, newName);
    res.setStatus(200).json({
      success: "true",
      data: "camarche",
    });
  } catch (err) {
    handleError(req, err);
  }
});

router.delete(pathUrl, async (req, res) => {
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
    console.log(data);
    res.setStatus(200).json({
      success: "true",
      data: "camarche",
    });
  } catch (err) {
    handleError(req, err);
  }
});

export default router;
