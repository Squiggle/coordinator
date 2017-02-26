import * as React from 'react';
import { RouteParams } from '../Routes';
import { PageService } from './PageResource';

class Home extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  private componentDidMount() {
  }

  render() {
    return (
      <h2>Hello world</h2>
    );
  }
}

export default Home;