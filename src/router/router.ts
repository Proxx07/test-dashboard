import {routes} from '@/router/routes.ts';
import {createRouter, createWebHistory, Router} from 'vue-router'
import {layoutMiddleware} from "@/middlewares/layoutMiddleware.ts";
import {checkUserRole} from "@/middlewares/checkUserRole.ts";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(checkUserRole)
router.beforeEach(layoutMiddleware)

export default router;