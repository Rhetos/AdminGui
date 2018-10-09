using RhetosConceptsAndExtensions.Handlers;
using System.ComponentModel.Composition;
using System.Web;
using System.Web.Routing;

namespace RhetosConceptsAndExtensions
{
    [Export(typeof(Rhetos.IService))]
    public class PingServiceRegistration : Rhetos.IService
    {
        public void Initialize()
        {
            RouteTable.Routes.Add(new Route("Ping", new PingRouteHandler()));
        }

        public void InitializeApplicationInstance(HttpApplication context)
        {
        }
    }
}