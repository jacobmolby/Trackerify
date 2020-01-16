import Home from '@/views/Home';
import Settings from '@/views/Settings';
import Login from '@/views/Login';
import Register from '@/views/Register';
// import Board from '@/views/Board';
import BoardOverview from '@/views/BoardOverview';
import Board from '../views/Board';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/board/',
    name: 'boardOverview',
    component: BoardOverview
  },
  {
    path: '/board/:boardId',
    name: 'board',
    component: Board
  },
  {
    path: '/team',
    name: 'team',
    component: Login
  }
];

export default routes;
