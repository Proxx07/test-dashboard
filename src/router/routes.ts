import {accesses} from "@/utils/roles.ts";
export const routes = [
  {
    path: "/",
    name: 'main',
    component: () => import("@/pages/Main.vue"),
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