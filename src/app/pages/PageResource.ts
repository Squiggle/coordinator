export interface PageResource {
  title: string;
  slug: string;
  content: string;
}

export class PageService {

  list(): PageResource[] {
    return [
      { title: 'Welcome', slug: 'welcome', content: '<h3>Hello!</h3><p>This is some customisable content</p>' },
      { title: 'Location', slug: 'location', content: '<h3>Location details</h3><p>In a place near a thing</p>' }
    ]
  }

  get(slug: string): PageResource {
    const item = this.list().filter((page) => page.slug == slug);
    return item.length ? item[0] : null;
  }
}

