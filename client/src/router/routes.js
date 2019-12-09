import Home from '@/components/routes/Home';
import Settings from '@/components/routes/Settings';
import Login from '@/components/routes/Login';
import Register from '@/components/routes/Register';
import Board from '@/components/routes/Board';
import BoardOverview from '@/components/routes/BoardOverview';

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
  }
];

export default routes;
