import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { store } from '@/store/';
import SocketInstance from '@/socketInstance';
import VueSocketIO from 'vue-socket.io';
import PortalVue from 'portal-vue';
import '@/assets/css/tailwind.css';

import router from './router';

Vue.use(VueRouter);
Vue.use(PortalVue);

Vue.use(
  new VueSocketIO({
    debug: process.env.PRODUCTION === 'production' ? false : true,
    connection: SocketInstance,
    vuex: { store, actionPrefix: 'SOCKET_' }
  })
);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
