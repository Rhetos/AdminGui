using System.Web;

namespace RhetosConceptsAndExtensions.Handlers
{
    public class PingRequestHandler : IHttpHandler
    {
        public bool IsReusable { get { return true; } }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Write("Ping OK");
        }
    }
}
