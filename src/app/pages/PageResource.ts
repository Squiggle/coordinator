interface PageResource {
  title: string;
  slug: string;
}

export class PageService {

  list(): PageResource[] {
    return [
      { title: 'Welcome', slug: 'welcome' },
      { title: 'Location', slug: 'location' }
    ]
  }
}

