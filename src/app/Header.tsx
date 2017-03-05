import * as React from 'react';
import { Link } from 'react-router';
import { PageResource, PageService } from './pages/PageResource';

import './assets/css/Header.scss';

class Header extends React.Component<any, any> {
  private pageService: PageService;

  constructor() {
    super();
    this.pageService = new PageService();
    this.state = { pages: [] };
  }

  private componentDidMount() {
    this.pageService.list()
      .then(pages => {
        this.setState({ pages: pages });
      });
  }

  render() {
    return (
      <div id='header'>
        <div className='header-banner'>
          <div className='header-left chalk'>
            Helen and Jonnie
            <br />are getting married!
          </div>
          <div className='header-right chalk'>
            Squirrelfest 2017
            <br />Escrick Park Estate, York
            <br />August 26th
          </div>
        </div>
        <nav className='header-topNav chalk'>
          <ul>
            <li key='home'><Link to='/'>Home</Link></li>
            { this.state.pages.map(p => <li key={p.slug}><Link to={`/page/${p.slug}`}>{ p.title }</Link></li>) }
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;