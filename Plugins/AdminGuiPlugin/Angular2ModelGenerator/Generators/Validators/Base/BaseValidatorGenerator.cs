using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Validators.Interfaces;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Generators.Validators.Base
{
    public abstract class BaseValidatorGenerator<T> : IValidatorGenerator where T : IConceptInfo
    {
        protected abstract string GenerateCode(T info);

        protected abstract PropertyInfo GetConceptInfo(T info);

        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                codeBuilder.InsertCode(GenerateCode(info), CsTagsManager.Instance.Get<PropertyInfo>(CsTagNames.Return), GetConceptInfo(info));
            }
        }
    }
}