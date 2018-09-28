using Rhetos;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Html
{
    [Export(typeof(Rhetos.IHomePageSnippet))]
    public class AdminGuiHomePageSnippet : IHomePageSnippet
    {
        public string Html => @"<h2>Rhetos AdminGui</h2><p><a href=""Resources/AdminGui"">Administration of registered entities</a></p>";
    }
}