import {createRouter, createWebHistory, Router} from 'vue-router'
import {layoutMiddleware} from "@/middlewares/layoutMiddleware.ts";

import {routes} from '@/router/routes.ts';
import {checkUserAccess} from "@/utils/roles.ts";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.filter((route) => checkUserAccess(route.access))
});

router.beforeEach(layoutMiddleware)

export default router;