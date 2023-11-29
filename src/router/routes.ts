import {accesses} from "@/utils/roles.ts";

export const routes = [
  {
    path: "/",
    name: 'main',
    component: () => import("@/pages/Main.vue"),
    meta: {
      layout: 'Default'
    },
    /*
    children: {
      path: "/",
      component: () => import("")
    }
    */
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
    path: "/events",
    name: "events",
    component: () => import("@/pages/Events.vue")
  },

  {
    path: "/projects",
    name: "projects",
    component: () => import("@/pages/Projects.vue")
  },

  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users/index.vue"),
    access: accesses.READ_USER
  },
  {
    path: "/users/user",
    name: "user",
    component: () => import("@/pages/Users/action.vue"),
    access: accesses.CREATE_USER,
  },

  {
    path: "/users/user/:id",
    name: "user-edit",
    component: () => import("@/pages/Users/action.vue"),
    access: accesses.UPDATE_USER
  },

  /*
  {
    path: "/devices",
    name: "devices",
    component: () => import("@/pages/Devices.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/Settings.vue")
  },
  */

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/Page_404.vue"),
    meta: {
      layout: 'Guest'
    }
  }
]