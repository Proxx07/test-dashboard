import {createRouter, createWebHistory, Router} from 'vue-router'
import {layoutMiddleware} from "@/middlewares/layoutMiddleware.ts";

import {routes} from '@/router/routes.ts';
import {checkUserAccess} from "@/utils/roles.ts";

const filteredRoutes = routes.filter(route => !route.access || checkUserAccess(route.access))

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: filteredRoutes
});

router.beforeEach(layoutMiddleware)

export default router;