using System.Web;
using System.Web.Routing;

namespace RhetosConceptsAndExtensions.Handlers
{
    public class PingRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new PingRequestHandler();
        }
    }
}
