import { assertThrowsAsync } from "../utils/deps.ts";
import pathController from "../controllers/pathController.ts";

Deno.test("test connection to FTP server", async function (): Promise<void> {
});

Deno.test("get file from FTP server", async function (): Promise<void> {
});

Deno.test("list directory from FTP server", async function (): Promise<void> {
});

Deno.test("list directory from FTP server", async function (): Promise<void> {
});

// Deno.test("test connection to FTP server", async function (): Promise<void> {
//   await assertThrowsAsync(
//     async (): Promise<void> => {
//       const clientFtp = new pathController("ftp.ubuntu.com", 21);
//       try {
//         await clientFtp.connectToServer();
//       } catch (err) {
//         throw new TypeError("connection fails");
//       }
//     },
//     TypeError,
//     "OHOH",
//   );
//   const clientFtp = new pathController("ftp.ubuntu.com", 21);
//   try {
//     await clientFtp.connectToServer();
//     return true;
//   } catch (err) {
//     throw new TypeError("connection fails");
//   }
// });
