using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Generators.Properties.Base;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;

namespace Angular2ModelGenerator.Generators.Properties
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(PropertyInfo))]
    public class PrimitivePropertyGenerator : BasePropertyGenerator<PropertyInfo>
    {
        private readonly KeyValuePair<Type, string>[] _supportedPropertyTypes = new KeyValuePair<Type, string>[]
        {
            new KeyValuePair<Type, string>(typeof(BinaryPropertyInfo), TypeScript.Types.Binary),
            new KeyValuePair<Type, string>(typeof(BoolPropertyInfo), TypeScript.Types.Boolean),
            new KeyValuePair<Type, string>(typeof(DatePropertyInfo), TypeScript.Types.Datetime),
            new KeyValuePair<Type, string>(typeof(DateTimePropertyInfo), TypeScript.Types.Datetime),
            new KeyValuePair<Type, string>(typeof(DecimalPropertyInfo), TypeScript.Types.Number),
            new KeyValuePair<Type, string>(typeof(GuidPropertyInfo), TypeScript.Types.String),
            new KeyValuePair<Type, string>(typeof(IntegerPropertyInfo), TypeScript.Types.Number),
            new KeyValuePair<Type, string>(typeof(LongStringPropertyInfo), TypeScript.Types.String),
            new KeyValuePair<Type, string>(typeof(MoneyPropertyInfo), TypeScript.Types.Number),
            new KeyValuePair<Type, string>(typeof(ShortStringPropertyInfo), TypeScript.Types.String)
        };

        protected override string PropertyNameSuffix => string.Empty;

        protected override string GetPropertyType(PropertyInfo info)
        {
            var type = info.GetType();

            return _supportedPropertyTypes.FirstOrDefault(p => p.Key.IsAssignableFrom(type)).Value ?? string.Empty;
        }

        protected override string GetReferenceType(PropertyInfo info)
        {
            return string.Empty;
        }
    }
}