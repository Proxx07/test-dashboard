import {accesses} from "@/utils/roles.ts";

declare module "*.vue" {
  import type {DefineComponent} from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: "Default" | "Guest"
    access?: accesses
  }
}
