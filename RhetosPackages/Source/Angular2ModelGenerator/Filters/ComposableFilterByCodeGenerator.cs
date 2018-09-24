using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;
using System;
using System.Threading;
using Angular2ModelGenerator.Repository;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Constants;

namespace Angular2ModelGenerator.Property
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(ComposableFilterByInfo))]
    public class ComposableFilterByCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        private static string ComposableFilterBySnippet(ComposableFilterByInfo info)
        {
            if (info.Parameter.Contains("."))
            {
                string result = string.Format(@"{{ name:"" {0} "", filter: ""{1}"", isComposableFilter: true }},
            ", info.Parameter.Split('.')[1],
                info.Parameter);
                ComposableFilterRepository.Add(info);
                return result;
            }
            else
            {
                string result = string.Format(@"{{ name:"" {0} "", filter: ""{0}"", isComposableFilter: true }},
            ", info.Parameter);
                ComposableFilterRepository.Add(info);
                return result;
            }
        }

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            ComposableFilterByInfo info = (ComposableFilterByInfo)conceptInfo;
            if (info.Parameter.Split('.').Length > 2) return; // ignore internal filters
            if (info.Parameter.EndsWith("Filter") && info.Parameter.Contains("_")) return; // ignore filters by InvalidData and similar
            codeBuilder.InsertCode(ComposableFilterBySnippet(info), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Filters), info.Source);
        }
    }
}
