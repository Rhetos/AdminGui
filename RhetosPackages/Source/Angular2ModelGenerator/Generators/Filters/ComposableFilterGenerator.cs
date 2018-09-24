using Angular2ModelGenerator.Constants;
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
        public override bool IsComposable => true;

        public override void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is RowPermissionsReadInfo info)
            {
                codeBuilder.InsertCode(FilterTemplates.GetHasReadRowPermissions(), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.AdditionalFunctions), info.Source);
            }

            base.GenerateCode(conceptInfo, codeBuilder);
        }

        protected override string GetParameter(ComposableFilterByInfo info)
        {
            return info.Parameter;
        }

        protected override DataStructureInfo GetPropertyInfo(ComposableFilterByInfo info)
        {
            return info.Source;
        }
    }
}