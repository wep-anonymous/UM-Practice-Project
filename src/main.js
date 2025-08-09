import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App) // This tells Vue: "Render the App component here."
}).$mount('#app');