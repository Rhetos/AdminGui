namespace Angular2ModelGenerator.Templates
{
    public class FilterTemplates
    {
        public static string Composable(string name, string filter, bool isComposable)
        {
            return $@"{{ name:' {name} ', filter: '{filter}', isComposableFilter: {isComposable.ToString().ToLower()}  }},
            ";
        }

        public static string GetHasReadRowPermissions()
        {
            return @"public getHasReadRowPermissions(): boolean { return true; }
                ";
        }
    }
}