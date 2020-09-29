using Angular2ModelGenerator.Generators.Interfaces;
using Autofac;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator
{
    [Export(typeof(Module))]
    public class Angular2ModelGenratorModuleConfiguration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            Rhetos.Extensibility.Plugins.FindAndRegisterPlugins<IAngular2ModelGeneratorPlugin>(builder);

            base.Load(builder);
        }
    }
}