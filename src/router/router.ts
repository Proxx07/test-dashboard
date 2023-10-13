import {createRouter, createWebHistory} from 'vue-router'
import {routes} from '@/router/routes.ts';
import {layoutMiddleware} from "@/middlewares/layoutMiddleware.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(layoutMiddleware)

export default router;