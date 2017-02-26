import * as React from 'react';
import { Link } from 'react-router';

class Header extends React.Component<any, any> {

  render() {
    return (
      <ul>
        <li><Link to='/page/where'>Where</Link></li>
        <li><Link to='/page/accommodation'>Accommodation</Link></li>
      </ul>
    );
  }
}

export default Header;