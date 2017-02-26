import * as React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component<any,any> {
  render() {
    return(
      <div>
        <p>The page you tried to view does not exist</p>
        <p><Link to='/'>Return to the main page</Link></p>
      </div>
    )
  }
}