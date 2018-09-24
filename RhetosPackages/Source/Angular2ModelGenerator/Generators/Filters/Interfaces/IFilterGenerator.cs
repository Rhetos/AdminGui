using Angular2ModelGenerator.Generators.Interfaces;

namespace Angular2ModelGenerator.Generators.Filters.Interfaces
{
    public interface IFilterGenerator : IAngular2ModelGeneratorPlugin
    {
        bool IsComposable { get; }
    }
}