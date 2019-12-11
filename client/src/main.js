import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { store } from '@/store/store';
import * as io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import PortalVue from 'portal-vue';
import '@/assets/css/tailwind.css';

import router from './router';

Vue.use(VueRouter);
Vue.use(PortalVue);

const SocketInstance = io.connect('http://192.168.1.14:8000', {
  query: {
    token: store.state.token
  }
});
Vue.use(
  new VueSocketIO({
    debug: true,
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
