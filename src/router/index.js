import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: () => import('../views/HomePage.vue') },
    { path: '/components', name: 'Components', component: () => import('../views/ComponentsPage.vue') },
    { path: '/charts', name: 'Charts', component: () => import('../views/ChartsPage.vue') },
    { path: '/settings', name: 'Settings', component: () => import('../views/SettingsPage.vue') },
    { path: '/data', name: 'Data', component: () => import('../views/DataPage.vue') }
];

const router = new VueRouter({
    mode: 'hash', //the # helps avoid server configuration issues
    routes
});

export default router;