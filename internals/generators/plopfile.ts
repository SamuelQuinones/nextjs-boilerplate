// plopfile.ts
import shelljs from "shelljs";
import { NodePlopAPI } from "node-plop";
import { HookGenerator } from "./hook";

export default function plop(plop: NodePlopAPI) {
  //@ts-ignore this works just fine

  plop.setGenerator("hook", HookGenerator);

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
