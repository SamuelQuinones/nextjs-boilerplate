// plopfile.ts
import shelljs from "shelljs";
import { NodePlopAPI } from "node-plop";
import { HookGenerator } from "./hook";
import { PageGenerator } from "./page";

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator("hook", HookGenerator);
  plop.setGenerator("page", PageGenerator);

  plop.setActionType("prettify", (answers, config) => {
    const data = config?.data as Record<string, any>;
    shelljs.exec(`prettier --write "${data.path}"`);
    return "";
  });
  plop.setActionType("lintify", (answers, config) => {
    const data = config?.data as Record<string, any>;
    shelljs.exec(`eslint --ext js,ts,tsx --fix "${data.path}"`);
    return "";
  });
}
