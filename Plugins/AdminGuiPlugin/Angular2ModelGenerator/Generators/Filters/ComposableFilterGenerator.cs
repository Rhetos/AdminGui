using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Filters;
using Angular2ModelGenerator.Generators.Filters.Base;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Plugins.Filters
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(ComposableFilterByInfo))]
    public class ComposableFilterGenerator : BaseFilterGenerator<ComposableFilterByInfo>
    {
        public override void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is RowPermissionsReadInfo info)
            {
                codeBuilder.InsertCode(FilterTemplates.GetHasReadRowPermissions(), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.AdditionalFunctions), info.Source);
            }

            base.GenerateCode(conceptInfo, codeBuilder);
        }

        protected override DataStructureInfo GetPropertyInfo(ComposableFilterByInfo info)
        {
            return info.Source;
        }

        protected override string GenerateCode(ComposableFilterByInfo info)
        {
            if (info.Parameter.Split('.').Length <= 2
                && !(info.Parameter.EndsWith("Filter") && info.Parameter.Contains("_")))
            {
                FilterParameters.Instance.Add(info.Parameter);

                return FilterTemplates.Composable(info.Parameter.Contains(".") ? info.Parameter.Split('.')[1] : info.Parameter, info.Parameter, true);
            }

            return string.Empty;
        }
    }
}