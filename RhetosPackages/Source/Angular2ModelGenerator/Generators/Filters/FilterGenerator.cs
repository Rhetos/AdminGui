using Angular2ModelGenerator.Filters;
using Angular2ModelGenerator.Generators.Filters.Base;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Templates;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Generators.Filters
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(FilterByInfo))]
    public class FilterGenerator : BaseFilterGenerator<FilterByInfo>
    {
        protected override DataStructureInfo GetPropertyInfo(FilterByInfo info)
        {
            return info.Source;
        }

        protected override string GenerateCode(FilterByInfo info)
        {
            if (!FilterParameters.Instance.Contains(info.Parameter)
                && info.Parameter.Split('.').Length <= 2
                && !(info.Parameter.EndsWith("Filter") && info.Parameter.Contains("_")))
            {
                return FilterTemplates.Composable(info.Parameter.Contains(".") ? info.Parameter.Split('.')[1] : info.Parameter, info.Parameter, false);
            }

            return string.Empty;
        }
    }
}