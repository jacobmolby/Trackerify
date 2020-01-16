import Home from '@/views/Home';
import Settings from '@/views/Settings';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Board from '@/views/Board';
import BoardOverview from '@/views/BoardOverview';
import DesignV2 from '@/views/DesignV2';

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
    path: '/test',
    name: 'test',
    component: DesignV2
  }
];

export default routes;
