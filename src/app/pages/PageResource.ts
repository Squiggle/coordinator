export interface PageResource {
  title: string;
  slug: string;
  content: string;
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
        return response.text();
      })
      .then(body => {
        return JSON.parse(body);
      });
  }
}

