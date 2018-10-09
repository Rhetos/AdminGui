using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Properties.Interfaces;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Generators.Properties.Base
{
    public abstract class BasePropertyGenerator<T> : IPropertyGenerator where T : PropertyInfo
    {
        protected abstract string PropertyNameSuffix { get; }

        protected abstract string GetPropertyType(T info);

        protected abstract string GetReferenceType(T info);

        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                var propertyType = GetPropertyType(info);

                if (!string.IsNullOrWhiteSpace(propertyType))
                {
                    codeBuilder.InsertCode(GenerateDefinition(info, propertyType), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Properties), info.DataStructure);
                    codeBuilder.InsertCode(GenerateBrowseFields(info, propertyType), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.BrowseFields), info.DataStructure);
                    codeBuilder.InsertCode(GenerateInitialization(info, propertyType), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.SetModelData), info.DataStructure);
                    codeBuilder.InsertCode(GenerateReturnValues(info, propertyType), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Validators), info.DataStructure);
                }
            }
        }

        protected virtual string GenerateDefinition(T info, string type)
        {
            switch (type)
            {
                case TypeScript.Types.Datetime:
                case TypeScript.Types.LongString:
                    return PropertyTemplates.Definition(info.Name, TypeScript.Types.String, PropertyNameSuffix);

                case TypeScript.Types.Binary:
                    return PropertyTemplates.Definition(info.Name, TypeScript.Types.Any, PropertyNameSuffix);
            }

            return PropertyTemplates.Definition(info.Name, type, PropertyNameSuffix);
        }

        protected virtual string GenerateBrowseFields(T info, string type)
        {
            var pipe = type == TypeScript.Types.Datetime ? TypeScript.Pipes.MsDate : string.Empty;
            var referenceType = GetReferenceType(info);

            if (!string.IsNullOrWhiteSpace(referenceType))
            {
                return PropertyTemplates.BrowseReferenceFields(info.Name, type, PropertyNameSuffix, pipe, referenceType);
            }

            return PropertyTemplates.BrowseFields(info.Name, type, pipe);
        }

        protected virtual string GenerateInitialization(T info, string type)
        {
            return PropertyTemplates.Initialization(info.Name, PropertyNameSuffix);
        }

        protected virtual string GenerateReturnValues(T info, string type)
        {
            return PropertyTemplates.ReturnValues(info.Name, PropertyNameSuffix, CsTagsManager.Instance.Get<PropertyInfo>(CsTagNames.Return).Evaluate(info));
        }
    }
}