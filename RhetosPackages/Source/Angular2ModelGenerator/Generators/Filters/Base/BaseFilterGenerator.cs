using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Filters;
using Angular2ModelGenerator.Generators.Filters.Interfaces;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Generators.Filters.Base
{
    public abstract class BaseFilterGenerator<T> : IFilterGenerator
    {
        public abstract bool IsComposable { get; }

        protected abstract string GetParameter(T info);

        protected abstract DataStructureInfo GetPropertyInfo(T info);

        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                var parameter = GetParameter(info);

                if (IsComposable)
                {
                    FilterParameters.Instance.Add(parameter);
                }

                if (IsParameterValid(parameter))
                {
                    codeBuilder.InsertCode(GenerateCode(parameter), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.Filters), GetPropertyInfo(info));
                }
            }
        }

        protected virtual bool IsParameterValid(string parameter)
        {
            // ignore internal filters & filters by InvalidData and similar
            return parameter.Split('.').Length <= 2 && !(parameter.EndsWith("Filter") && parameter.Contains("_"));
        }

        protected virtual string GenerateCode(string parameter)
        {
            if (IsComposable || !FilterParameters.Instance.Contains(parameter))
            {
                if (parameter.Contains("."))
                {
                    return FilterTemplates.Composable(parameter.Split('.')[1], parameter, IsComposable);
                }

                return FilterTemplates.Composable(parameter, IsComposable);
            }

            return string.Empty;
        }
    }
}