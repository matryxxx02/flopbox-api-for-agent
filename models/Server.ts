import { Document } from "../utils/deps.ts";

export default interface Server extends Document {
  alias?: string;
  url?: string;
}
