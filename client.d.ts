type vitePluginReactConventionRouteConfig = Partial<{
  pageDir: string; // 根路径
  layout: string; //layout路径
  routerType: string; //路由类型
}>;

type vitePluginReactConventionRouteModule = Record<string, any>;

declare module "virtual:vite-plugin-react-convention-route" {
  import { set } from "lodash-es";
  import { Suspense, lazy, ComponentType } from "react";
  import {
    useRoutes,
    BrowserRouter,
    RouteObject,
    HashRouter,
  } from "react-router-dom";

  export default React.Component;
}
