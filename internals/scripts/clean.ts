import shelljs from "shelljs";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import packageJson from "../../package.json";

process.chdir(path.join(__dirname, "../.."));

export async function cleanAndSetup() {
  if (!shelljs.test("-e", "internals/startingTemplate")) {
    shelljs.echo("The example app has already been deleted");
    shelljs.exit(1);
  }
  shelljs.echo("\x1b[34m", "Cleaning the example app...", "\x1b[0m");

  shelljs.rm("-rf", "public/*");
  shelljs.rm("-rf", "src/*");
  shelljs.rm("-rf", ".github");
  shelljs.rm("-rf", "vercel.json");

  shelljs.cp("internals/startingTemplate/README.md", "README.md");
  shelljs.cp("internals/startingTemplate/.gitignore.base", ".gitignore");
  shelljs.cp("internals/startingTemplate/next.config.js", "next.config.js");
  shelljs.cp("internals/startingTemplate/.env.base", ".env");
  shelljs.cp("-r", "internals/startingTemplate/public/*", "public");
  shelljs.cp("-r", "internals/startingTemplate/src/*", "src");

  shelljs.rm("-rf", "internals/startingTemplate");
  //* POTENTIALLY CHANGE THIS IF MORE USEFUL SCRIPTS COME UP
  shelljs.rm("-rf", "internals/scripts");

  shelljs.exec('prettier --write "README.md"', { silent: true });
  shelljs.exec("eslint --ext js,ts,tsx --fix src", { silent: true });
  shelljs.exec('prettier --write "src/styles"', {
    silent: true,
  });

  const packageManager = await shouldUseYarn();

  modifyPackageJSON(packageManager?.toLowerCase() === "yarn");
  fixSeoConfig();

  shelljs.echo(
    "\x1b[32m",
    "Example app removed and setup complete! Enjoy the template :)",
    "\x1b[0m"
  );
}

async function shouldUseYarn() {
  let packageManager = "npm";
  if (process.argv?.[2]) {
    packageManager = process.argv?.[2];
  } else {
    const target = await inquirer.prompt({
      message: "Which package manager will you be using?",
      name: "packageManager",
      type: "list",
      choices: ["npm", "yarn"],
      validate: (input) => Boolean(input.trim()),
    });
    packageManager = target.packageManager;
  }
  return packageManager;
}

function fixSeoConfig() {
  const appName = path.basename(path.join(__dirname, "../../"));
  shelljs.echo(
    "\x1b[34m",
    `Setting 'SEO.openGraph.site_name' as '${appName}' in 'src/util/SeoConfig.ts', be sure to change it if this is incorrect`,
    "\x1b[0m"
  );
  let SeoConfig = readFileSync("./src/util/SeoConfig.ts", "utf-8");
  SeoConfig = SeoConfig.replace(
    'siteName: "nextjs-boilerplate"',
    `siteName: "${appName}"`
  );
  writeFileSync("./src/util/SeoConfig.ts", SeoConfig);
  shelljs.exec(`eslint --ext js,ts,tsx --fix "src/util/SeoConfig.ts"`, {
    silent: true,
  });
}

function modifyPackageJSON(usingYarn = false) {
  //@ts-ignore this warning is not useful
  delete packageJson["scripts"]["cleanAndSetup"];
  //@ts-ignore this warning is not useful
  delete packageJson["scripts"]["refresh"];

  // Should assign correct app name
  const appName = path.basename(path.join(__dirname, "../../"));
  shelljs.echo(
    "\x1b[34m",
    `Setting 'package.json' name property as ${appName}, be sure to change it if this is incorrect`,
    "\x1b[0m"
  );
  packageJson["name"] = appName;

  let installCode = "npm install";
  let installDepCode = "npm install";
  if (usingYarn) {
    installCode = "yarn install";
    installDepCode = "yarn add";
    packageJson["scripts"]["build:full"] = "yarn build && yarn export";
  }

  writeFileSync("./package.json", JSON.stringify(packageJson));
  shelljs.exec('prettier --write "package.json"', { silent: true });

  shelljs.exec(installCode, { silent: false });

  const nodeVer = shelljs.exec("node --version", { silent: true }).stdout;
  const nodeVerTransformed = parseInt(nodeVer.replace(/[^0-9\.]/g, ""));

  shelljs.exec(`${installDepCode} -D @types/node@^${nodeVerTransformed}`);
}

(async function () {
  await cleanAndSetup();
})();
