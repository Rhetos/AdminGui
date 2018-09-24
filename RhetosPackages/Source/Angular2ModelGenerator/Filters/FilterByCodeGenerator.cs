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
    [ExportMetadata(MefProvider.Implements, typeof(FilterByInfo))]
    public class FilterByCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        private static string FilterBySnippet(FilterByInfo info)
        {
            if (ComposableFilterRepository.CompareExist(info.Parameter))
            {
                if (info.Parameter.Contains("."))
                {                   
                    string result = string.Format(@"{{ name:"" {0} "", filter: ""{1}"", isComposableFilter: false }},
            ", info.Parameter.Split('.')[1],
                        info.Parameter);
                    return result;
                }
                else
                {
                    string result = string.Format(@"{{ name:"" {0} "", filter: ""{0}"", isComposableFilter: false }},
            ", info.Parameter);
                    return result;
                }
            }
            else return "";
        }

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            FilterByInfo info = (FilterByInfo)conceptInfo;
            if (info.Parameter.Split('.').Length > 2) return; // ignore internal filters
            if (info.Parameter.EndsWith("Filter") && info.Parameter.Contains("_")) return; // ignore filters by InvalidData and similar
            codeBuilder.InsertCode(FilterBySnippet(info), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Filters), info.Source);
        }
    }
}
