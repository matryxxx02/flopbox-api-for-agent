import { FileDB } from "../utils/deps.ts";

// create database with autosave
export default new FileDB({ rootDir: "./data", isAutosave: true });
