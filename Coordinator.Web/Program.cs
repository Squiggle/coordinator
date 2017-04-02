using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Rewrite;
using Coordinator.Web.Services;

namespace Coordinator.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseWebRoot("www")
                .Build();
            host.Run();
        }
    }

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .AddJsonFormatters(options => options.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddMemoryCache();
   
            // custom application dependencies
            services.AddSingleton<CachedContentService>();

            services.AddCors();
        }

                // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment()) {
                // log to console for development
                loggerFactory.AddConsole();

                // allow CORS requests for development
                app.UseCors(builder => {
                    builder
                        .WithOrigins("http://localhost")
                        .AllowAnyHeader();
                });

                app.UseDeveloperExceptionPage();
            }
            // TODO: add production logging
            // loggerFactory.AddProvider(...)

            app.UseMvc();
            
            app.UseRewriter(new RewriteOptions()
                .AddRewrite("^page/(.*)", "index.html", true)
            );

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
