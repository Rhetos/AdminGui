using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using RhetosConceptsAndExtensions.Models;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;

namespace RhetosConceptsAndExtensions.Macros
{
    [Export(typeof(IConceptMacro))]
    public class ExternalActionMacro : IConceptMacro<ExternalActionInfo>
    {
        public IEnumerable<IConceptInfo> CreateNewConcepts(ExternalActionInfo conceptInfo, IDslModel existingConcepts)
        {
            return new IConceptInfo[]
            {
                new ModuleExternalReferenceInfo
                {
                    Module = conceptInfo.Module,
                    TypeOrAssembly = ExtractClassAssemblyLocation(conceptInfo.ExternalMethodLocation)
                },
                // this will ensure that Newtonsoft.Json.JsonConvert is available in code we wrote - copy data from one object to another
                new ModuleExternalReferenceInfo
                {
                    Module = conceptInfo.Module,
                    TypeOrAssembly = "Newtonsoft.Json.JsonConvert,Newtonsoft.Json"
                },
                new ComputationUseExecutionContextInfo
                {
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