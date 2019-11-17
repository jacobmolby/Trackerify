import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { store } from '@/store/store';
import '@/assets/css/tailwind.css';

import router from './router';

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
