import * as React from 'react'  
import * as ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { PageService } from './pages/PageResource'; 
import Header from './Header';
import Home from './pages/Home';
import Page from './pages/Page';
import NotFound from './NotFound';

import './assets/css/App.scss';

class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/page/:pageName' component={Page} />
        </Route>
        <Route path='/notfound' component={NotFound} />
      </Router> 
    );
  }
}

export default class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='app'>
        <Header />
        <div id='content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

// bootstrap
ReactDOM.render(<AppContainer />, document.getElementById('react'));