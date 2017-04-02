import { PageResource } from './pages/PageResource';

export interface SiteResource {
  title: string;
  index: PageResource;
}

export class SiteService {

  get(): Promise<SiteResource> {
    return fetch('/api/v1/site')
      .then(result => {
        return result.text();
      })
      .then(body => {
        const site = JSON.parse(body);
        this.setSiteMetadata(site);
        return site;
      });
  }

  private setSiteMetadata(site: SiteResource): void {
    document.title = site.title;
  }

}