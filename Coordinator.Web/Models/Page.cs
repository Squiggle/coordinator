using System.Collections.Generic;

namespace Coordinator.Web.Modes {
  public class Page {

    public string Slug { get; set; }

    public string Title { get; set; }
    
    public Dictionary<string, string> Parts { get; set; }
  }
}