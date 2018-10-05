using System.ComponentModel.Composition;
using System.Web;

namespace RhetosConceptsAndExtensions
{
    using Modules;

    [Export(typeof(Rhetos.IService))]
    public class InModuleRegistration : Rhetos.IService
    {
        public void Initialize()
        {
        }

        private static IHttpModule _optionsPreflightRequestAccepter = new CORSOptionsRequestModule();

        public void InitializeApplicationInstance(HttpApplication context)
        {
            _optionsPreflightRequestAccepter.Init(context);
        }
    }
}