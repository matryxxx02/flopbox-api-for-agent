import { Sha256 } from "./deps.ts";

export default (file: Uint8Array) => {
  return new Sha256().update(file).hex();
};
