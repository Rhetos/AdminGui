using Rhetos.Compiler;
using Rhetos.Dom.DefaultConcepts;
using Rhetos.Dsl;
using Rhetos.Extensibility;
using RhetosConceptsAndExtensions.Models;
using System.ComponentModel.Composition;

namespace RhetosConceptsAndExtensions.Generators
{
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
            if (conceptInfo is CreatedByUserInfo info)
            {
                codeBuilder.InsertCode(SetCreatedByUserValue(info), WritableOrmDataStructureCodeGenerator.InitializationTag, info.Property.DataStructure);
            }
        }
    }
}