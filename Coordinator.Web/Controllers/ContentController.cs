
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Coordinator.Web.Models;
using System.Linq;
using Coordinator.Web.Services;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Coordinator.Web.Controllers {
  
  [RouteAttribute("api/v1/content")]
  public class ContentController : Microsoft.AspNetCore.Mvc.ControllerBase
  {
    private readonly CachedContentService contentService;

    public ContentController(CachedContentService contentService) {
      this.contentService = contentService;
    }

    [HttpGet, Route("")]
    public async Task<IActionResult> GetContentList() {
      var pages = await GetPagesAsync();
      var contents = pages.Select(kvp => new { kvp.Key, kvp.Value.Title, kvp.Value.Slug });
      return Ok(contents);
    }

    [HttpGet, Route("{slug}")]
    public async Task<IActionResult> GetContent(string slug) {
      var pages = await GetPagesAsync();
      var page = pages.Values.FirstOrDefault(p => p.Slug == slug);
      if (page == null) {
        return NotFound();
      }

      // get full page content
      foreach (var templatePart in page.Templates) {
        page.Parts = page.Parts ?? new Dictionary<string, Content>();
        page.Parts[templatePart.Key] = new Content {
          Markup = await contentService.GetFileContentAsync(templatePart.Value)
        };
      }
      return Ok(page);
    }

    private async Task<Dictionary<string, Page>> GetPagesAsync() {
      var sitemap = await contentService.GetFileContentAsync("sitemap.json");
      return JsonConvert.DeserializeObject<Dictionary<string, Page>>(sitemap);
    }

  }
}