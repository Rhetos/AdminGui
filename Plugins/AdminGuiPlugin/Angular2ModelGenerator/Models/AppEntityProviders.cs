using Angular2ModelGenerator.Templates;
using System.Collections.Generic;
using System.Linq;

namespace Angular2ModelGenerator.Models
{
    public class AppEntityProviders : List<KeyValuePair<string, string>>
    {
        public override string ToString()
        {
            return string.Concat(this.Select(p => ProviderTemplates.AppEntityProvider(p.Key, p.Value))) + ProviderTemplates.Export;
        }
    }
}