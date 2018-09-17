using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angular2ModelGenerator
{
    [Export(typeof(Rhetos.IHomePageSnippet))]
    public class AdminGuiHomePageSnippet : Rhetos.IHomePageSnippet
    {
        public string Html
        {
            get
            {
                return
@"        <h2>Rhetos AdminGui</h2>
        <p><a href=""Resources/AdminGui"">Administration of registered entities</a></p>
";
            }
        }
    }
}
