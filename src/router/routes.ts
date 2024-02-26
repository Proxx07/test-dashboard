import {accesses} from "@/utils/roles.ts";
import {RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: 'main',
    component: () => import("@/pages/Transactions.vue"),
    meta: {
      layout: 'Default'
    },
  },

  {
    path: "/auth",
    name: 'auth',
    component: () => import("@/pages/Auth.vue"),
    meta: {
      layout: 'Guest'
    }
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: {
      access: accesses.READ_DASHBOARD
    }
  },

  {
    path: "/projects",
    name: "projects",
    component: () => import("@/pages/Projects/index.vue"),
  },

  {
    path: "/test",
    name: "test",
    component: () => import("@/pages/DashboardTest.vue"),
  },

  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      access: accesses.READ_USER
    }
  },
  {
    path: "/users/user",
    name: "user",
    component: () => import("@/pages/Users/action.vue"),
    meta: {
      access: accesses.CREATE_USER,
    }
  },

  {
    path: "/users/user/:id",
    name: "user-edit",
    component: () => import("@/pages/Users/action.vue"),
    meta: {
      access: accesses.UPDATE_USER
    }
  },

  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/Settings.vue")
  },

  {
    path: "/no-permission",
    name: "no-permission",
    component: () => import("@/pages/NoPermission.vue")
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/Page_404.vue"),
    meta: {
      layout: 'Guest'
    }
  }
]