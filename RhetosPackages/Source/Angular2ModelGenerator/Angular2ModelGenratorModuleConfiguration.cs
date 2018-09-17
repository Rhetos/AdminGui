using Autofac;
using System.ComponentModel.Composition;
using System.Diagnostics.Contracts;

namespace Angular2ModelGenerator
{
    public class Angular2ModelGenratorModuleConfiguration : Module
    {
        [Export(typeof(Module))]
        protected override void Load(ContainerBuilder builder)
        {
            Rhetos.Extensibility.Plugins.FindAndRegisterPlugins<IAngular2ModelGenratorPlugin>(builder);

            base.Load(builder);
        }
    }
}
