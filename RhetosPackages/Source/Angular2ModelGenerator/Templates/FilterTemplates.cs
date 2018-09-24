namespace Angular2ModelGenerator.Templates
{
    public class FilterTemplates
    {
        public static string Composable(string filter, bool check)
        {
            return $@"{{ name:"" {filter} "", filter: ""{filter}"", isComposableFilter: {check.ToString().ToLower()} }},
            ";
        }

        public static string Composable(string name, string filter, bool check)
        {
            return $@"{{ name:"" {name} "", filter: ""{filter}"", isComposableFilter: {check.ToString().ToLower()}  }},
            ";
        }

        public static string GetHasReadRowPermissions()
        {
            return @"private getHasReadRowPermissions(DataStructure: IEmptyConstruct): boolean { return true; }
                ";
        }
    }
}