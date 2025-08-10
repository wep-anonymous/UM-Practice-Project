import Vue from 'vue';
import App from './App.vue';
import router from './router';  // ADD THIS LINE!

Vue.config.productionTip = false;

new Vue({
    router,  // ADD THIS LINE!
    render: h => h(App)
}).$mount('#app');