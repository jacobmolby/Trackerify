const Home = () => import('../views/HomePage');
const Settings = () => import('../views/SettingsPage');
const Teams = () => import('../views/TeamsPage');
const Login = () => import('../views/LoginPage');
const Register = () => import('../views/RegisterPage');
const BoardOverview = () => import('../views/BoardOverviewPage');
const Board = () => import('../views/BoardPage');

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
