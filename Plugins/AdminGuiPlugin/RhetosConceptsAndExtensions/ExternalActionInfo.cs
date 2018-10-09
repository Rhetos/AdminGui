using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Dsl;

namespace RhetosConceptsAndExtensions
{
    /// <summary>
    /// Provides new Concept for Rhetos language.
    /// Now, it is possible to write actions inside VisualStudio and test it.
    /// Later just declare it in .RHE script like this:
    /// 
    /// ExternalAction SomeAction 'CustomPlugin.StaticMethods.SomeAction,CustomPlugin' 'CustomPlugin.StaticMethods.SomeActionParam' 
    ///	{
    ///		Guid EntityID;
    /// }
    /// 
    /// Make sure that SomeActionParam (or similar class) is exact form as defined ExternalAction - in above, one property of type
    ///     Guid, and named EntityID. As Newtonsoft.Json.JsonConvert is used to transform data from one to another object,
    ///     if form is not same, it would break in runtime.
    /// </summary>
    [Export(typeof(IConceptInfo))]
    [Export(typeof(IAlternativeInitializationConcept))]
    [ConceptKeyword("ExternalAction")]
    public class ExternalActionInfo : ActionInfo, IAlternativeInitializationConcept
    {
        public string ExternalMethodLocation { get; set; }

        public string ExternalMethodParameter { get; set; }

        public IEnumerable<string> DeclareNonparsableProperties()
        {
            return new[] { "Script" };
        }

        public void InitializeNonparsableProperties(out IEnumerable<IConceptInfo> createdConcepts)
        {
            this.Script = string.Format(@"(parameters, repository, userInfo, executionContext) => {{ 
                            {0}(Newtonsoft.Json.JsonConvert.DeserializeObject<{1}>(Newtonsoft.Json.JsonConvert.SerializeObject(parameters)), repository, userInfo, executionContext); 
                        }}", ExternalMethodLocation.Split(',')[0], ExternalMethodParameter);
            createdConcepts = null;
        }
    }

    [Export(typeof(IConceptMacro))]
    public class ExternalActionMacro : IConceptMacro<ExternalActionInfo>
    {
        public IEnumerable<IConceptInfo> CreateNewConcepts(ExternalActionInfo conceptInfo, IDslModel existingConcepts)
        {
            return new IConceptInfo[]
            {
                new ModuleExternalReferenceInfo {
                    Module = conceptInfo.Module,
                    TypeOrAssembly = ExtractClassAssemblyLocation(conceptInfo.ExternalMethodLocation)
                },
                // this will ensure that Newtonsoft.Json.JsonConvert is available in code we wrote - copy data from one object to another
                new ModuleExternalReferenceInfo {
                    Module = conceptInfo.Module,
                    TypeOrAssembly = "Newtonsoft.Json.JsonConvert,Newtonsoft.Json"
                },
                new ComputationUseExecutionContextInfo {
                    Computation = conceptInfo
                }
            };
        }

        /// <summary>
        /// Extracts Assembly name from method.
        /// </summary>
        /// <param name="extMethodDefinition"></param>
        /// <returns>Removes method name and returns everything except it.</returns>
        public string ExtractClassAssemblyLocation(string extMethodDefinition)
        {
            string[] splitDef = extMethodDefinition.Split(',');
            splitDef[0] = splitDef[0].Split('.').Reverse().Skip(1).Aggregate((acc, next) => next + '.' + acc);
            return string.Join(",", splitDef);
        }
    }
}