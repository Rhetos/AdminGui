using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using System.ComponentModel.Composition;

namespace RhetosConceptsAndExtensions.Models
{
    [Export(typeof(IConceptInfo))]
    [ConceptKeyword("CreatedByUser")]
    public class CreatedByUserInfo : IConceptInfo
    {
        [ConceptKey]
        public ReferencePropertyInfo Property { get; set; }
    }
}