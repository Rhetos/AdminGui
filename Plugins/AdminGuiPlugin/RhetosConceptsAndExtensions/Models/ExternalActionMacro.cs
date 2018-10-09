using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using System.Collections.Generic;
using System.ComponentModel.Composition;

namespace RhetosConceptsAndExtensions.Models
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
            Script = string.Format(@"(parameters, repository, userInfo, executionContext) => {{
                            {0}(Newtonsoft.Json.JsonConvert.DeserializeObject<{1}>(Newtonsoft.Json.JsonConvert.SerializeObject(parameters)), repository, userInfo, executionContext);
                        }}", ExternalMethodLocation.Split(',')[0], ExternalMethodParameter);
            createdConcepts = null;
        }
    }
}