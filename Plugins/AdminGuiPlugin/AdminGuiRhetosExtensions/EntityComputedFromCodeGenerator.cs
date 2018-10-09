using Rhetos.Compiler;
using Rhetos.Extensibility;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Dom.DefaultConcepts;
using Rhetos.Dsl;
using Newtonsoft.Json;

namespace AdminGuiRhetosExtensions
{
    [Export(typeof(IConceptCodeGenerator))]
    [ExportMetadata(MefProvider.Implements, typeof(EntityComputedFromInfo))]
    public class EntityDiffWithCodeGenerator : IConceptCodeGenerator
    {
        public static readonly CsTag<EntityComputedFromInfo> CompareKeyPropertyTag = "CompareKeyProperty";
        public static readonly CsTag<EntityComputedFromInfo> CompareValuePropertyTag = "CompareValueProperty";
        public static readonly CsTag<EntityComputedFromInfo> ClonePropertyTag = "CloneProperty";
        public static readonly CsTag<EntityComputedFromInfo> AssignPropertyTag = "AssignProperty";
        public static readonly CsTag<EntityComputedFromInfo> OverrideDefaultFiltersTag = new CsTag<EntityComputedFromInfo>("OverrideDefaultFilters", TagType.Reverse);

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            var info = (EntityComputedFromInfo)conceptInfo;
            codeBuilder.InsertCode(CodeSnippet(info), RepositoryHelper.RepositoryMembers, info.Target);
        }

        public static string RecomputeFunctionName(EntityComputedFromInfo info)
        {
            return "DiffWith" + DslUtility.NameOptionalModule(info.Source, info.Target.Module);
        }
        private static string CodeSnippet(EntityComputedFromInfo info)
        {
            return string.Format(
        @"public bool CompareSameValue_{2} ({0} x, {0} y)
        {{
            {3}
            return true;  
        }}

        public void {2}(string source, object filter, out IEnumerable<{0}> toInsert, out IEnumerable<{0}> toUpdate, out IEnumerable<{0}> toDelete)
        {{

            filter = filter ?? new FilterAll();

            var sourceRepository = _executionContext.GenericRepositories.GetGenericRepository<{1}>().Load(filter);
            var destinationRepository = _executionContext.GenericRepositories.GetGenericRepository<{0}>().Load(filter);
            
            var newSourceRepository = sourceRepository.Select(sourceItem => new {0} {{
                ID = sourceItem.ID,
                {4} }}).ToList();
            
            toDelete = destinationRepository.Where(n => sourceRepository.Where(m=>m.ID == n.ID).SingleOrDefault() == null).ToList();

            toInsert = newSourceRepository.Where(n => destinationRepository.Where(m => m.ID == n.ID).SingleOrDefault() == null).ToList();

            toUpdate = destinationRepository.Where(n => newSourceRepository.Where(m => m.ID == n.ID && !CompareSameValue_{2}(m,n)).SingleOrDefault() != null).ToList();
            
        }}

        ",
            info.Target.GetKeyProperties(),
            info.Source.GetKeyProperties(),
            RecomputeFunctionName(info),
            CompareValuePropertyTag.Evaluate(info),
            ClonePropertyTag.Evaluate(info));
        }
    
    }
}
