import { Plugin, transformWithEsbuild } from "vite";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export default function vitePluginReactConventionRoute(
  options: vitePluginReactConventionRouteConfig = {}
): Plugin {
  console.log("options", options);
  const {
    pageDir = "/src/pages",
    layout = "/src/layout/index.tsx",
    routerType = "hash",
  } = options;

  const templateStr = fs.readFileSync(path.join(__dirname, "./template.jsx"), {
    encoding: "utf-8",
    flag: "r",
  });

  const assembleCode = templateStr
    .replaceAll("${pageDir}", pageDir)
    .replaceAll("${layout}", layout)
    .replaceAll("${routerType}", routerType);

  //console.log("template", assembleCode);
  const name = "vite-plugin-react-convention-route";
  const virtualModuleId = `virtual:${name}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  //const isDev = process.env.NODE_ENV === "development";
  return {
    name,
    enforce: "pre",

    resolveId(id) {
      //console.log("resolveId", id);
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      console.log("load", id);
      if (id === resolvedVirtualModuleId) {
        const esbuldResult = await transformWithEsbuild(
          assembleCode,
          `${name}.tsx`,
          {
            loader: "tsx",
          }
        );
        return esbuldResult.code;
      }
    },

    async transform(code, id) {
      console.log("transform", id);
      // if (id === resolvedVirtualModuleId) {

      //   console.log("transform here", id);
      //   return esbuldResult.code;
      // }
    },
  };
}
