import { config } from "./utils/deps.ts";
import Servers from "./routes/servers.ts";
import Path from "./routes/path.ts";
import { json, opine, raw, urlencoded } from "./utils/deps.ts";
import logger from "./middlewares/logger.ts";

const port = Number(config().PORT);
const app = opine();

app.use(json());
app.use(urlencoded());
app.use(raw());
app.use(logger);

app.use("/servers", Path, Servers);
app.listen(port);

console.log(`SERVER HOST ON PORT : ${port} ✅`);
