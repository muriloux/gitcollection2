import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repositories } from '../pages/Repositories';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Dashboard} path="/" exact />
      <Route component={Repositories} path="/repositories/:repository+" />
    </Switch>
  );
};
