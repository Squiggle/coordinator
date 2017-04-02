import * as React from 'react'  
import * as ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import { SiteService, SiteResource } from './SiteService';
import Header from './Header';
import Page from './pages/Page';
import NotFound from './NotFound';

import './assets/css/App.scss';

class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRedirect to='page/home' />
          <Route path='/page/:pageName' component={Page} />
        </Route>
        <Route path='/notfound' component={NotFound} />
      </Router>
    );
  }
}

export default class App extends React.Component<any, any> {

  private siteService = new SiteService();

  constructor(props) {
    super(props);
    this.state = { site: null };
  }

  private componentDidMount() {
    this.siteService.get()
      .then((site: SiteResource) => {
        this.setState({ site: site });
      });
  }

  render() {
    if (!this.state.site) {
      return <div id='app'>Loading...</div>
    }

    return (
      <div id='app'>
        <Header site={this.state.site} />
        <div id='content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

// bootstrap
ReactDOM.render(<AppContainer />, document.getElementById('react'));