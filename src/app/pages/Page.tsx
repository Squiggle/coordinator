import * as React from 'react';
import { browserHistory } from 'react-router';
import { RouteParams } from '../Routes';
import { PageResource, PageService } from './PageResource';

interface PageProps extends RouteParams {
}

interface PageState {
  page: PageResource;
}

class Page extends React.Component<PageProps, PageState> {
  private pageService: PageService;

  constructor(props) {
    super(props);
    this.pageService = new PageService();
    this.state = {
      page: null
    };
  }

  private componentDidMount() {
    let page = this.pageService.get(this.props.params.pageName);
    // load the page content
    if (page == null) {
      console.log('Unable to find page ' + this.props.params.pageName);
      browserHistory.push('/notfound');
    }
    this.setState({
      page: page
    });
  }

  render() {
    return (
      this.state.page == null
        ? <div className="page loading"></div>
        :
      <div className="page">
        <h2>{ this.state.page.title }</h2>
        <div className="page-content" dangerouslySetInnerHTML={{__html: this.state.page.content }}>
        </div>
      </div>
    );
  }
}

export default Page;