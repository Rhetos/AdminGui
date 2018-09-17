using System.ComponentModel.Composition;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Dsl;

using Rhetos.Compiler;
using Rhetos.Extensibility;
using System;
using Rhetos.Dom.DefaultConcepts;

namespace RhetosConceptsAndExtensions
{
    [Export(typeof(IConceptInfo))]
    [ConceptKeyword("CreatedByUser")]
    public class CreatedByUserInfo : IConceptInfo
    {
        [ConceptKey]
        public ReferencePropertyInfo Property { get; set; }
    }

    [Export(typeof(IConceptCodeGenerator))]
    [ExportMetadata(MefProvider.Implements, typeof(CreatedByUserInfo))]
    public class CreatedByUserGenerator : IConceptCodeGenerator
    {
        private string SetCreatedByUserValue(CreatedByUserInfo info)
        {
            return string.Format(
            @"{{
                var currentUserID = _domRepository.Common.Principal.Filter(new Common.MyAccount()).Single().ID;

                foreach (var newItem in insertedNew)
                    if(newItem.{0}ID == null)
                        newItem.{0}ID = currentUserID;
            }}
            ", info.Property.Name);
        }

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            var info = (CreatedByUserInfo)conceptInfo;

            codeBuilder.InsertCode(SetCreatedByUserValue(info), WritableOrmDataStructureCodeGenerator.InitializationTag, info.Property.DataStructure);
        }
    }
}
