import * as React from 'react';

export interface Injectable {
  dependencies?: { [key: string]: any };
}

function injectedComponent(dependencyNames: string[], Component) {
  dependencyNames = dependencyNames || [];

  return class InjectedComponent extends React.Component<any, any> {

    private dependencies?: { [key: string]: any };

    constructor(props: Injectable) {
      super(props);
      this.dependencies = {};
      dependencyNames.forEach(n => this.dependencies[n] = this.resolve(n));
    }

    private resolve(depId: string): any {
      return depId + '_aaaaa';
    }

    render() {
      // create the component, with the dependencies available via .props
      return (<Component dependencies={this.dependencies} />);
    }
  }
}

/**
 * Decorator
 * @inject(['serviceName', 'otherServiceName'])
 * Ensures that instances of registered services available on the Component
 * As a dictionary on the Component's props
 * i.e. this.props.dependency['serviceName']
 */
export function Inject(dependencyNames: string[]) {
  return function(component: typeof React.Component) {
    return injectedComponent(dependencyNames, component);
  }
}