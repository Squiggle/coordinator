interface PageResource {
  title: string;
  slug: string;
}

class PageService {

  list(): PageResource[] {
    return [
      { title: 'Welcome', slug: 'welcome' },
      { title: 'Location', slug: 'location' }
    ]
  }
}

