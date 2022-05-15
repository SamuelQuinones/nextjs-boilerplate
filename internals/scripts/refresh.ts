import shelljs from "shelljs";
import path from "path";

process.chdir(path.join(__dirname, "../.."));

console.log("\x1b[34mRemoving lockfile and node_modules\x1b[0m");
shelljs.rm("package-lock.json");
shelljs.rm("-rf", "node_modules");
console.log(
  "\x1b[32mAll done, be sure to run `npm install` to be able to use the app\x1b[0m"
);
