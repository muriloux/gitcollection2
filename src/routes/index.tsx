import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Dashboard = React.lazy(
  () => import(/* webpackChunkName: 'dashboard' */ '../pages/Dashboard'),
);
const Repositories = React.lazy(
  () => import(/* webpackChunkName: 'repositories' */ '../pages/Repositories'),
);

export const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        <Route component={Repositories} path="/repositories/:repository+" />
      </Switch>
    </React.Suspense>
  );
};
