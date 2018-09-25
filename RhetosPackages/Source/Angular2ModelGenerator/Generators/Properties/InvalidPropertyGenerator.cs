using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Generators.Properties.Base;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;
using System.Text.RegularExpressions;

namespace Angular2ModelGenerator.Generators.Properties
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(InvalidDataInfo))]
    public class InvalidPropertyGenerator : BaseInvalidPropertyGenerator<InvalidDataInfo>
    {
        protected override string GetErrorMessage(InvalidDataInfo info)
        {
            return Regex.Replace(info.ErrorMessage, RegularExpressions.DetectEscape, m => m.Value.Replace("\"", ""));
        }

        protected override string GetModuleName(InvalidDataInfo info)
        {
            return info.Source.Module.Name;
        }

        protected override string GetPropertyName(InvalidDataInfo info)
        {
            return info.FilterType.Contains(".") ? info.FilterType.Split('.')[1] : info.FilterType;
        }

        protected override DataStructureInfo GetConceptInfo(InvalidDataInfo info)
        {
            return info.Source;
        }
    }
}