namespace Angular2ModelGenerator.Templates
{
    public class ProviderTemplates
    {
        public const string Export = @"
@Injectable()
export class AllModels{}";

        public static string AppEntityProvider(string module, string name)
        {
            return $@"
@AppEntityProvider({{ ID: '{module}.{name}', EntityType: {module}{name} }})
";
        }
    }
}