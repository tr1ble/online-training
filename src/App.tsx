import React from 'react';
import logo from './logo.svg';
import './App.css';

import { inject, observer } from "mobx-react";
import { Router, Route, Switch, RouteProps } from 'react-router-dom';
import { Alert } from 'antd'

import * as pages from 'pages';
import history from 'global/history'

interface AppProps {
  authState?: any; 
}

@inject('authState')
@observer
class App extends React.PureComponent<AppProps> {
  getRoutes() {
    
  }
}

export default App;
