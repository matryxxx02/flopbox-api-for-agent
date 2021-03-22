import serversController from "../controllers/serversController.ts";
import { Router } from "../utils/deps.ts";

const router = Router();
const pathUrl = "/:alias?";
const serversDb = new serversController();

router.get(pathUrl, async (req, res) => {
  try {
    const servers = await serversDb.getAll();
    res.setStatus(200).json(servers);
  } catch (err) {
    console.error(err);
    res.setStatus(500).json("Internal error");
  }
});

router.post(pathUrl, async (req, res) => {
  const { alias, url } = req.body;
  if (!alias || !url) {
    return res.setStatus(400).json(
      "This resource requires the `:alias` and `:url` body param",
    );
  }

  const server = await serversDb.getOne(alias);
  if (server) {
    return res.setStatus(409).json(
      "This resource already exist",
    );
  }

  await serversDb.insertOne(alias, url);
  res.setStatus(201).json("Server added");
});

router.put(pathUrl, async (req, res) => {
  const alias = req.params.alias;
  const { newAlias, url } = req.body;
  const servers = await serversDb.getAll();

  if (servers.length === 0) {
    return res.setStatus(404).json("Not found resource");
  }

  if (!url || !newAlias) {
    return res.setStatus(400).json(
      "This resource require the `alias` and `url` body param",
    );
  }

  await serversDb.updateOne(alias, { alias: newAlias, url });
  res.setStatus(204).send();
});

router.delete(pathUrl, async (req, res) => {
  const alias = req.params.alias;
  try {
    await serversDb.deleteOne(alias);
  } catch (err) {
    console.error(err);
    res.setStatus(500).send("Internal error");
    //TODO: if server not exist
  }

  res.setStatus(204).send();
});

export default router;
