import React from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';


const renderRoutes = (routes, authed, signIn = '/login', switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        render={(props:RouteComponentProps) => {
            //  如果路由不需要鉴权 或者 已经登录了 或者用户访问的是login页面则渲染页面
          if (!route.requiredAuth || authed || route.path === signIn) {
            return <route.component {...props} route={route} />;
          }
          // 如果没有登录则重定向到登录页面 并记录跳转的页面
          return <Redirect to={{ pathname: signIn, state: { from: props.location } }} />;
        }}
      />
    ))}
  </Switch>
) : null;

export default renderRoutes;
