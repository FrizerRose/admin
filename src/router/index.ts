import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import firebase from 'firebase';

import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/customers',
    name: 'Customers',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "about" */ '../views/Customers.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/faq',
    name: 'Faq',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "about" */ '@/views/Faq.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/payment',
    name: 'Payments',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "about" */ '@/views/Payments.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page.
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

if (process.env.NODE_ENV === 'production') {
  router.beforeEach(async (to, from, next) => {
    const getCurrentUser = () => new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });

    const requiresAuth = to.matched.some((record) => record.meta.authRequired);
    if (requiresAuth && !(await getCurrentUser())) {
      next('/login');
    } else {
      next();
    }
  });
}

export default router;
