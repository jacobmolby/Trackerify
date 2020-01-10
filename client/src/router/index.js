import VueRouter from 'vue-router';
import jwtDecode from 'jwt-decode';
import routes from './routes';
import { store } from '../store';
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  let token;
  if (localStorage.getItem('vuex')) {
    token = JSON.parse(localStorage.getItem('vuex')).token;
  } else {
    token = false;
  }

  const current_time = Date.now().valueOf() / 1000;
  const tokenExpired = !token ? true : jwtDecode(token).exp < current_time;

  // try to access a restricted page + not logged in
  if (authRequired && tokenExpired) {
    store.dispatch('logout');
    return next('/login');
  }

  next();
});
export default router;
