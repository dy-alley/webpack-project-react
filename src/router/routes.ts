import loadable from '@loadable/component'; // 按需加载
import { RouteInterface } from '@/types/router';

const routes:RouteInterface[] = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@/pages/home/index')),
    name: 'home',
    title: '首页',
    requiredAuth: false,
    key: '/'
  },
  {
    path: '/login',
    component: loadable(() => import('@/pages/login')),
    name: 'login',
    title: '登录'
  },
  {
    path: '*',
    exact: true,
    component: loadable(() => import('@/pages/notFound/index')),
    name: '404',
    title: '404'
  }
];
export default routes;
