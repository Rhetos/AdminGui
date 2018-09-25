using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Filters.Interfaces;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Generators.Filters.Base
{
    public abstract class BaseFilterGenerator<T> : IFilterGenerator
    {
        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                codeBuilder.InsertCode(GenerateCode(info), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Filters), GetPropertyInfo(info));
            }
        }

        protected abstract DataStructureInfo GetPropertyInfo(T info);

        protected abstract string GenerateCode(T info);
    }
}