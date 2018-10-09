using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Properties.Interfaces;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Generators.Properties.Base
{
    public abstract class BaseInvalidPropertyGenerator<T> : IPropertyGenerator where T : IConceptInfo
    {
        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                codeBuilder.InsertCode(GenerateInvalidProperties(info), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.InvalidData), GetConceptInfo(info));
            }
        }

        protected virtual string GenerateInvalidProperties(T info)
        {
            var errorMessage = GetErrorMessage(info);

            if (errorMessage?.Length > 0)
            {
                return PropertyTemplates.Invalid(GetPropertyName(info), GetModuleName(info), errorMessage);
            }

            return PropertyTemplates.Invalid(GetPropertyName(info), GetModuleName(info));
        }

        protected abstract string GetErrorMessage(T info);

        protected abstract string GetModuleName(T info);

        protected abstract string GetPropertyName(T info);

        protected abstract DataStructureInfo GetConceptInfo(T info);
    }
}