import pathController from "../controllers/pathController.ts";
import serversController from "../controllers/serversController.ts";
import { isFormFile, MultipartReader, Router, Sha256 } from "../utils/deps.ts";

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

//TODO : move in to middleware
const findServer = async (req: any, res: any) => {
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias } = req.params;
  const port = req.query.port || 21;
  const url = (await serversDb.getOne(alias))?.url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }

  return new pathController(url, port, login, password);
};

router.get("/:alias/checksum/:path(*)?", async (req, res) => {
  const { path } = req.params;
  const clientFtp = await findServer(req, res);
  const file = path?.includes(".") || "";

  try {
    let data;
    if (file) {
      data = await clientFtp.getFileChecksum(path);
      res.setStatus(200).send(data);
    } else {
      data = await clientFtp.getAllFilesChecksum(path);
      res.setStatus(200).send(data);
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.get(pathUrl, async (req, res) => {
  const { path } = req.params;
  const action = req.query.action || "list";
  const clientFtp = await findServer(req, res);

  if (!["list", "dl"].includes(action)) {
    throw res.setStatus(400).json(
      "action param only accept 'dl' and 'list' value",
    );
  }

  const file = path?.includes(".") || "";
  try {
    let data;
    if (file) {
      data = await clientFtp.downloadFile(path);
      res.setStatus(200).send(data);
    } else {
      if (action === "dl") {
        data = await clientFtp.downloadDir(path);
        await res.download(data);
        Deno.remove(data);
      } else {
        data = await clientFtp.listDir(path);
        res.setStatus(200).send(data);
      }
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.post(pathUrl, async (req: any, res) => {
  const { path } = req.params;
  const clientFtp = await findServer(req, res);

  const boundary = req.get("content-type").split("=").pop();
  if (!boundary) {
    return res.setStatus(400).send("You must send file in form-data");
  }
  const mr = new MultipartReader(req.body, boundary);
  const form = await mr.readForm();
  const fileData = form.file("file");

  if (isFormFile(fileData)) {
    try {
      await clientFtp.uploadFile(path, fileData.content!);
      res.setStatus(204).send();
    } catch (err) {
      handleError(res, err);
    }
  } else {
    return res.setStatus(500).send("Internal error.");
  }
});

router.put("/:alias/:path(*)", async (req, res) => {
  const { path } = req.params;
  const { newName } = req.body;
  if (!newName) {
    throw res.setStatus(400).json("newName is required.");
  }
  const clientFtp = await findServer(req, res);
  try {
    await clientFtp.renameFile(path, newName);
    res.setStatus(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

router.delete("/:alias/:path(*)", async (req, res) => {
  const { path } = req.params;
  const port = req.query.port || 21;
  const clientFtp = await findServer(req, res);

  try {
    const data = await clientFtp.deleteFile(path);
    res.setStatus(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
