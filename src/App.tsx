import React from 'react';
import './App.css';

import { inject, observer } from "mobx-react";
import { Router, Route, Switch } from 'react-router-dom';
import { Alert } from 'antd'

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
    const { authorized } = this.props.authState;
    const actualRoutes = authorized ? routes.mainRoutes : routes.authRoutes;
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
    const {
      isAlertVisible,
      textAlert,
      typeAlert,
      //authorized,
      //setAuthorized,
      hideAlert
    } = this.props.authState;
    return (
      <>
        <Router history={history}>
          <div className={'appContainer'}>
            {isAlertVisible && (
              <Alert
                className={"alertContainer"}
                message={textAlert}
                type={typeAlert}
                closable
                onClose={() => {
                  setTimeout(() => {
                    hideAlert();
                  }, 1000);
                }}
              />
            )}

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
