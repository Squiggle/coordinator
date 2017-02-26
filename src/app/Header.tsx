import * as React from 'react';
import { Link } from 'react-router';
import { PageResource, PageService } from './pages/PageResource';

import './assets/css/Header.scss';

class Header extends React.Component<any, any> {
  private pageService: PageService;

  constructor() {
    super();
    this.pageService = new PageService();
  }

  render() {
    const pages = this.pageService.list();
    return (
      <div id='header'>
        <nav className='header-topNav'>
          <ul>
            <li key='home'><Link to='/'>Home</Link></li>
            { pages.map(p => <li key={p.slug}><Link to={`/page/${p.slug}`}>{ p.title }</Link></li>) }
          </ul>
        </nav>
        <div className='header-banner'>
          <div className='header-left'>
            Helen and Jonnie
            <br />are getting married!
          </div>
          <div className='header-right'>
            Squirrelfest 2017
            <br />Escrick Park Estate, York
            <br />August 26th
          </div>
        </div>
      </div>
    );
  }
}

export default Header;