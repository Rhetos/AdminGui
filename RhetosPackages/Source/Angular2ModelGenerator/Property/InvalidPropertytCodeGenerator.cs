using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;
using System;

namespace Angular2ModelGenerator.Property
{
    [Export(typeof(IAngular2ModelGenratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(InvalidDataInfo))]
    public class InvalidPropertytCodeGenerator : IAngular2ModelGenratorPlugin
    {
        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            InvalidDataInfo info = (InvalidDataInfo)conceptInfo;
            PropertyCodeGeneratorHelper.GenerateCodeForInvalidData(info, codeBuilder);
        }
    }
}
