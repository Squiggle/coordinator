

using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.PlatformAbstractions;

namespace Coordinator.Web.Services
{
  public class CachedContentService
  {
    private readonly IHostingEnvironment env;
    private readonly IMemoryCache memoryCache;

    private const string KeyPrefix = "CONTENT";
    private readonly MemoryCacheEntryOptions cacheEntryOptions;

    public CachedContentService(IHostingEnvironment env, IMemoryCache memoryCache) {
      this.env = env;
      this.memoryCache = memoryCache;
      this.cacheEntryOptions = new MemoryCacheEntryOptions()
        .SetPriority(CacheItemPriority.High);
      cacheEntryOptions.SlidingExpiration = TimeSpan.FromMinutes(10);
    }

    public async Task<string> GetFileContentAsync(string key) {
      if (key.Contains("..")) {
        throw new Exception("Must be a content path");
      }
      return await memoryCache.GetOrCreateAsync<string>($"{KeyPrefix}.{key}", async entry => {
        entry.SetOptions(cacheEntryOptions);
        var appRoot = PlatformServices.Default.Application.ApplicationBasePath;
        var path = $"{appRoot}{Path.DirectorySeparatorChar}Content{Path.DirectorySeparatorChar}{key}";
        using (StreamReader reader = File.OpenText(path)) {
          var result = await reader.ReadToEndAsync();
          memoryCache.Set(entry.Key, result);
          return result;
        }
      });
    }

  }
}