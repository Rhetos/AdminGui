using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;
using Angular2ModelGenerator.Generators.Interfaces;

namespace Angular2ModelGenerator.Property
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(PropertyInfo))]
    public class Angular2SimplePropertyCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        private static IDictionary<Type, string> supportedPropertyTypes = new Dictionary<Type, string>
        {
            { typeof(BinaryPropertyInfo), "binary" },
            { typeof(BoolPropertyInfo), "boolean" },
            { typeof(DatePropertyInfo), "datetime" },
            { typeof(DateTimePropertyInfo), "datetime" },
            { typeof(DecimalPropertyInfo), "number" },
            { typeof(GuidPropertyInfo), "string" },
            { typeof(IntegerPropertyInfo), "number" },
            { typeof(LongStringPropertyInfo), "string" },
            { typeof(MoneyPropertyInfo), "number" },
            { typeof(ShortStringPropertyInfo), "string" },
        };

        private static string GetPropertyType(PropertyInfo conceptInfo)
        {
            return supportedPropertyTypes
                .Where(prop => prop.Key.IsAssignableFrom(conceptInfo.GetType()))
                .Select(prop => prop.Value)
                .FirstOrDefault();
        }

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            PropertyInfo info = (PropertyInfo)conceptInfo;
            string propertyType = GetPropertyType(info);

            if (!String.IsNullOrEmpty(propertyType))
                PropertyCodeGeneratorHelper.GenerateCodeForType(info, codeBuilder, propertyType);
        }

    }
}
