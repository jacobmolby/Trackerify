const Home = () => import('../views/Home');
const Settings = () => import('../views/Settings');
const Teams = () => import('../views/Teams');
const Login = () => import('../views/Login');
const Register = () => import('../views/Register');
const BoardOverview = () => import('../views/BoardOverview');
const Board = () => import('../views/Board');

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
    path: '/teams',
    name: 'teams',
    component: Teams
  },
  {
    // Catch all until 404 is made
    path: '*',
    redirect: '/'
  }
];

export default routes;
