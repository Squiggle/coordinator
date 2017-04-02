
using Microsoft.AspNetCore.Mvc;
using Coordinator.Web.Models;

namespace Coordinator.Web.Controllers {
  
  [RouteAttribute("api/v1/site")]
  public class SiteController : Microsoft.AspNetCore.Mvc.ControllerBase {

    private static readonly Site site = new Site {
      Title = "Squirrelfest: The wedding Helen and Jonnie",
      Index = "home"
    };

    [HttpGet, Route("")]
    public IActionResult GetSite()
    {
      return Ok(site);
    }
  }
}