
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Coordinator.Web.Modes;
using System.Linq;

namespace Coordinator.Web.Controllers {
  
  [RouteAttribute("api/v1/content")]
  public class ContentController : Microsoft.AspNetCore.Mvc.ControllerBase {

    private static readonly List<Page> pages = new List<Page> {
      new Page {
        Slug = "home",
        Title = "Welcome",
        Parts = new Dictionary<string, string> {
          { "content", "<h3>Hello!</h3><p>This is some customisable content</p>" }
        }
      },
      new Page {
        Slug = "location",
        Title = "Location",
        Parts = new Dictionary<string, string> {
          { "content", "<h3>Location details</h3><p>In a place near a thing</p>" }
        }
      },
      new Page {
        Slug = "ceremony",
        Title = "Ceremony",
        Parts = new Dictionary<string, string> {
          { "content", "<h3>The Ceremony</h3><p>will be the thing wereby we get married in a place</p>" }
        }
      }
    };

    [HttpGet, Route("")]
    public IActionResult GetContentList() {
      var contents = pages.Select(p => new { p.Slug, p.Title });
      return Ok(contents);
    }

    [HttpGet, Route("{slug}")]
    public IActionResult GetContentList(string slug) {
      var page = pages.FirstOrDefault(p => p.Slug == slug);
      if (pages == null) {
        return NotFound();
      }
      return Ok(page);
    }

  }
}