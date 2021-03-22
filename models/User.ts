import { Document } from "https://deno.land/x/filedb/mod.ts";

export default interface User extends Document {
  login?: string;
  password?: string;
}
