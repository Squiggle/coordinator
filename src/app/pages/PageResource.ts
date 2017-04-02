export interface PageResource {
  title: string;
  slug: string;
  parts: { [key: string]: PageContent };
}

export interface PageContent {
  markup: string;
  attachments: string[];
}

export class PageService {

  list(): Promise<PageResource[]> {
    return fetch('/api/v1/content')
      .then(response => {
        return response.text();
      })
      .then(body => {
        return JSON.parse(body);
      });
  }

  get(slug: string): Promise<PageResource> {
    if (!slug) {
      throw 'No page identifier provided';
    }

    return fetch(`/api/v1/content/${slug}`)
      .then(response => {
        if (response.status >= 400) {
          throw `No content for ${slug}`;
        }
        return response.text();
      })
      .then(body => {
        return JSON.parse(body);
      });
  }
}

