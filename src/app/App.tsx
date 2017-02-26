import * as React from 'react'  
import * as ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { PageService } from './pages/PageResource'; 
import Header from './Header';
import Home from './pages/Home';
import Page from './pages/Page';
import NotFound from './NotFound';

class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <div className='body'>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='/page/:pageName' component={Page} />
          </Route>
          <Route path='/notfound' component={NotFound} />
        </Router> 
      </div>
    );
  }
}

export default class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return(
      <div className='app'>
        <Header />
        { this.props.children }
      </div>
    );
  }
}

// bootstrap
ReactDOM.render(<AppContainer />, document.getElementById('content'));