import * as React from 'react'  
import * as ReactDOM from 'react-dom'

class App extends React.Component<any, any> {
  render() {
    return(<h1>Now then</h1>)
  }
}

// bootstrap
ReactDOM.render(<App />, document.getElementById('content'))