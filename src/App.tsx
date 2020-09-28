import React from 'react';
import './App.css';

import { inject, observer } from "mobx-react";
import { Router, Route, Switch } from 'react-router-dom';

import * as pages from 'pages';
import history from 'global/history'
import routes from 'routes';

interface AppProps {
  authState?: any; 
}

@inject('authState')
@observer
class App extends React.PureComponent<AppProps> {

  getRoutes() {
    const actualRoutes = routes.mainRoutes.concat(routes.authRoutes);
    return actualRoutes.map(r => (
      <Route
        key={r.path}
        path={r.path}
        exact={r.exact}
        component={r.route}
      />
    ));
  }
  render() {
    return (
      <>
        <Router history={history}>
          <div className={'appContainer'}>

            <Switch>
              {this.getRoutes()}
              <Route path="*" component={pages.PageNotFound} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
