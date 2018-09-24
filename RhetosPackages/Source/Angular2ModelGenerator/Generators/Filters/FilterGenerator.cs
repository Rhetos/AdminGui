using Angular2ModelGenerator.Generators.Filters.Base;
using Angular2ModelGenerator.Generators.Interfaces;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Generators.Filters
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(FilterByInfo))]
    public class FilterGenerator : BaseFilterGenerator<FilterByInfo>
    {
        public override bool IsComposable => false;

        protected override string GetParameter(FilterByInfo info)
        {
            return info.Parameter;
        }

        protected override DataStructureInfo GetPropertyInfo(FilterByInfo info)
        {
            return info.Source;
        }
    }
}