import VueRouter from 'vue-router';
import jwtDecode from 'jwt-decode';
import { get } from 'lodash';
import routes from './routes';
import { store } from '../store';
const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  let token =
    store.state.token || get(localStorage.getItem('vuex'), token, null);

  if (token && token.split(' ').length > 1) {
    token = token.split(' ')[1];
  }

  const current_time = Date.now().valueOf() / 1000;
  const tokenExpired = !token ? true : jwtDecode(token).exp < current_time;

  // try to access a restricted page + not logged in
  if (authRequired && tokenExpired) {
    store.dispatch('logout');
    return next('/login');
  }

  if (to.path === '/login' && store.state.isUserLoggedIn) {
    return next('/board');
  }

  next();
});
export default router;
