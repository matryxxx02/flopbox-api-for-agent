import pathController from "../controllers/pathController.ts";
import serversController from "../controllers/serversController.ts";

export default async (req: any, res: any, next: () => {}) => {
  const serversDb = new serversController();
  const login = req.get("Authorization")?.split(":")[0] || "anonymous";
  const password = req.get("Authorization")?.split(":")[1] || "";
  const { alias } = req.params;
  const port = req.query.port || 21;
  const url = (await serversDb.getOne(alias)).url;
  if (!url) {
    throw res.setStatus(404).json("server not exist.");
  }
  req.clientFtp = new pathController(url, port, login, password);
  next();
};
