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
        public void InitializeApplicationInstance(HttpApplication context) { }
    }

    public class PingRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new PingRequestHandler();
        }
    }

    public class PingRequestHandler : IHttpHandler
    {
        public bool IsReusable { get { return true; } }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Write("Ping OK");
        }
    }

    [Export(typeof(Rhetos.IService))]
    public class InModuleRegistration : Rhetos.IService
    {
        public void Initialize()
        {
        }

        private static IHttpModule _optionsPreflightRequestAccepter = new CORSOptionsRequestModuleHandler();

        public void InitializeApplicationInstance(HttpApplication context)
        {
            _optionsPreflightRequestAccepter.Init(context);
        }
    }

    public class CORSOptionsRequestModuleHandler : IHttpModule
    {
        public void Dispose() { }

        public void Init(HttpApplication context)
        {
            context.PreSendRequestHeaders += delegate
            {
                if (context.Request.HttpMethod == "OPTIONS")
                {
                    var response = context.Response;
                    response.StatusCode = 200;
                }
            };
        }
    }
}
