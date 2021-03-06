import { Actions, PlopGeneratorConfig } from "node-plop";
import * as path from "path";

const hooksDirectory = path.join(__dirname, "../../../src/hooks");
const templateDir = __dirname;

export enum HookPromptConfig {
  hookName = "hookName",
}

type Answers = { [P in HookPromptConfig]: string };

export const HookGenerator: PlopGeneratorConfig = {
  description: "Generate custom hooks",
  prompts: [
    {
      type: "input",
      name: HookPromptConfig.hookName,
      message: "What is the name of your hook?",
    },
  ],
  actions: (data) => {
    const _answers = data as Answers;
    const actions: Actions = [];

    const newHookPath = `${hooksDirectory}/{{kebabCase ${HookPromptConfig.hookName}}}.ts`;
    const allHooksPath = `${hooksDirectory}/index.ts`;

    actions.push({
      type: "add",
      path: newHookPath,
      templateFile: `${templateDir}/template.hbs`,
      abortOnFail: true,
    });
    actions.push({
      type: "append",
      path: allHooksPath,
      pattern: /(\/\/ APPEND HERE)/g,
      template: `export { default as {{camelCase ${HookPromptConfig.hookName}}} } from "./{{kebabCase ${HookPromptConfig.hookName}}}";`,
      abortOnFail: true,
    });
    actions.push({
      type: "lintify",
      data: {
        path: hooksDirectory,
      },
    });
    return actions;
  },
};
