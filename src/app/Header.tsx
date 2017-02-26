import * as React from 'react';
import { Link } from 'react-router';
import { PageResource, PageService } from './pages/PageResource';

class Header extends React.Component<any, any> {
  private pageService: PageService;

  constructor() {
    super();
    this.pageService = new PageService();
  }

  render() {
    const pages = this.pageService.list();
    return (
      <ul>
        { pages.map(p => <li><Link to={`/page/${p.slug}`}>{ p.title }</Link></li>) }
      </ul>
    );
  }
}

export default Header;