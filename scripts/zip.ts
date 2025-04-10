import { existsSync, rmSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import os from "os";

const zipPath = path.resolve(__dirname, "../dist/lambda.zip");
const distPath = path.resolve(__dirname, "../dist");

if (existsSync(zipPath)) {
  rmSync(zipPath);
}

const platform = os.platform();

if (platform === "win32") {
  // Use PowerShell on Windows
  execSync(
    `powershell -Command "Compress-Archive -Path '${distPath}/*' -DestinationPath '${zipPath}'"`,
    { stdio: "inherit" }
  );
} else {
  // Use `zip` command on Unix-like systems
  execSync(`cd ${distPath} && zip -r lambda.zip .`, { stdio: "inherit" });
}
