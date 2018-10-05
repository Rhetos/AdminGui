using System.Web;

namespace RhetosConceptsAndExtensions.Modules
{
    public class CORSOptionsRequestModule : IHttpModule
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
