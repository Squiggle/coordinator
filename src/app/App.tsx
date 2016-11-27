import * as React from 'react'  
import * as ReactDOM from 'react-dom'

import { Inject, Injectable } from './Injector';
import { PageService } from './pages/PageResource'; 

interface AppProps extends Injectable {
}

@Inject(['title'])
class App extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return(<h1>Now then, {this.props.dependencies['title']}</h1>)
  }
}

// bootstrap
ReactDOM.render(<App />, document.getElementById('content'))