using System.Collections.Generic;

namespace Coordinator.Web.Models {
  public class Page {

    public string Slug { get; set; }

    public string Title { get; set; }
    
    public Dictionary<string, string> Templates { get; set; }
    
    public Dictionary<string, Content> Parts { get; set; }
  }
}