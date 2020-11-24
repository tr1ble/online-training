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
    const { authorized, remember, role } = this.props.authState;
    let actualRoutes = routes.authRoutes;
    if(authorized==true && remember==true) {
      switch(role) {
        case('ROLE_ADMINISTRATOR'):
          actualRoutes = routes.adminRoutes;
          break;
        case('ROLE_TRAINER'):
          actualRoutes = routes.trainerRoutes;
          break;
        case('ROLE_DEFAULT'):
          actualRoutes = routes.defaultRoutes;
      }
    }

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
