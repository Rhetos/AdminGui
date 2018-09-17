using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angular2ModelGenerator.Property
{
    public static class AppEntityProviderCodeGenerator
    {
        private static List<string> listEntityProviderModule = new List<string>();
        private static List<string> listEntityProviderName = new List<string>();

        private static string initialExportClass = @"
@Injectable()
export class AllModels{}";

        private static string Format = @"
@AppEntityProvider({{ ID: '{0}.{1}', EntityType: {0}{1} }})
";
        public static string GenerateAppEntityProvider()
        {
            string result = "";
            int count = listEntityProviderModule.Count;
            for (int i = 0; i < count; i++)
            {
                result += string.Format(Format, listEntityProviderModule[i], listEntityProviderName[i]);
            }
            result += initialExportClass;
            return result;
        }

        public static void AddEntityProvider(string _entityProviderModule, string _entityProviderName)
        {
            listEntityProviderModule.Add(_entityProviderModule);
            listEntityProviderName.Add(_entityProviderName);
        }


    }
}
