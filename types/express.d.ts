import pathController from "../controllers/pathController.ts";

declare namespace Express {
  interface Request {
    clientFtp: pathController;
  }
}
