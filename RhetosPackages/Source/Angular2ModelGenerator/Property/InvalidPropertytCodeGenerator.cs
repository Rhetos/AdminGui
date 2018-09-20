using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;
using System;
using Angular2ModelGenerator.Generators.Interfaces;

namespace Angular2ModelGenerator.Property
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(InvalidDataInfo))]
    public class InvalidPropertytCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            InvalidDataInfo info = (InvalidDataInfo)conceptInfo;
            PropertyCodeGeneratorHelper.GenerateCodeForInvalidData(info, codeBuilder);
        }
    }
}
