import routes from './routes';
import VueRouter from 'vue-router';
import { store } from '../store/store';
import jwtDecode from 'jwt-decode';
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const token = JSON.parse(localStorage.getItem('vuex')).token;

  var current_time = Date.now().valueOf() / 1000;
  const tokenExpired = !token ? true : jwtDecode(token).exp < current_time;

  // try to access a restricted page + not logged in
  if (authRequired && tokenExpired) {
    store.dispatch('logout');
    return next('/login');
  }

  next();
});
export default router;
