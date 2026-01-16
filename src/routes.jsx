import HomePage from '@/pages';


const routes = [
  {
    path: '/',
    key: 'home',
    component: <HomePage />,
    isRootRouter: true,
    isDisplayedInBottomNav: true,
    name: 'Trang chủ',
  },
];

export default routes;