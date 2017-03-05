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

  private componentWillReceiveProps(nextProps: PageProps) {
    this.loadPageContent(nextProps.params.pageName);
  }
  
  private componentDidMount() {
    this.loadPageContent(this.props.params.pageName);
  }

  private loadPageContent(pageName: string) {
    let page = this.pageService.get(pageName)
      .then(resource => {
        // load the page content
        if (page == null) {
          console.error('Unable to find page ' + pageName);
          browserHistory.push('/notfound');
        }
        this.setState({
          page: resource
        });
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