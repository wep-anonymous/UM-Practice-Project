import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomePage.vue')
    }
    , {
        path: '/components',
        name: 'Components',
        component: () => import('../views/ComponentsPage.vue')
    }
];

const router = new VueRouter({
    mode: 'hash', //the # helps avoid server configuration issues
    routes
});

export default router;