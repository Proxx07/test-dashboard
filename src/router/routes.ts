export const routes = [
  {
    path: "/",
    name: 'main',
    component: () => import("@/pages/Main.vue"),
    meta: {
      layout: 'Default'
    },
    // children: {
    //   path: "/",
    //   component: () => import("")
    // }
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
    path: "/devices",
    name: "devices",
    component: () => import("@/pages/Devices.vue")
  },

  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users.vue")
  },

  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/Settings.vue")
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/Page_404.vue")
  }
]