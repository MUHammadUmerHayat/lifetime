import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import LoginPage from '../views/Pages/LoginPage';
import TimelinePage from '../views/Pages/TimelinePage';
import TablePage from '../views/Pages/TablePage';
import NotFoundPage from '../views/Pages/NotFoundPage';
import Dashboard from '../views/Layouts/Dashboard';

/* eslint-disable react/prop-types */
export default ({ requireAuth }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} onEnter={requireAuth}>
      <IndexRoute name="Timeline" component={TimelinePage} />
      <Route path="/timeline" name="Timeline" component={TimelinePage} />
      <Route path="/media" name="Photos & Videos" component={TablePage} />
    </Route>
    <Route path="/login" component={LoginPage} />
    <Route path="/*" component={NotFoundPage} />
  </Router>
);
