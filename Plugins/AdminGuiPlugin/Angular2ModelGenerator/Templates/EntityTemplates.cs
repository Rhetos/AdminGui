namespace Angular2ModelGenerator.Templates
{
    public class EntityTemplates
    {
        public static string Entity(
            string className,
            string module,
            string name,
            string properties = "",
            string fields = "",
            string setMethods = "",
            string getMethods = "")
        {
            return $@"
export class {className} extends BaseEntity implements BaseEntityWithFilters
{{
    {properties}

    getInstance(): IEmptyConstruct {{ return  {className}; }}
    getNewInstance(): IDataStructure {{ return new {className}(); }}
    getModuleName(): string {{ return ""{module}""; }}
    getEntityName(): string {{ return ""{name}""; }}
    {fields}
    {setMethods}
    {getMethods}
}}";
        }

        public class Fields
        {
            public static string Browse(string fields)
            {
                return
    $@"public browseFields: Array<IFieldDefinition> = [
        {fields}
    ];
    ";
            }
        }

        public class SetMethods
        {
            public static string ModelData(string className, string setModels)
            {
                return
    $@"public setModelData(modelData: {className}) {{
        if (modelData) {{
            {setModels}
        }}
    }}
    ";
            }
        }

        public class GetMethods
        {
            public static string Validators(string validators)
            {
                return
    $@"getValidators(): {{ [propName: string]: ValidatorDefinition[]; }} {{
        return {{
            {validators}
        }};
    }}
    ";
            }

            public static string InvalidDataDefinitions(string definitions)
            {
                return
    $@"getInvalidDataDefinitions():Array<IInvalidDataFilter> {{
        return [
            {definitions}
        ];
    }}
    ";
            }

            public static string FilterDefinitions(string definitions)
            {
                return
    $@"getFilterDefinitions():Array<IFilterDefinition> {{
        return [
            {definitions}
        ];
    }}
    ";
            }

            public static string ParentName(string instance, string tag)
            {
                return
    $@"getParentName(): string {{
        return {instance};
    }}
    {tag}
    ";
            }
        }

        public class AppMenuItem
        {
           
            public const string Export = @"
@Injectable()
export class AllMenuItemModels{}";

            
            public static string Container(string name, string items, string icon)
            {
                return $@"
@AppMenuItem(
    {{
        Name: ""{name}"",
        Link: """",
        Icon: ""{icon}"",
        Tooltip: """",
        Children:
        [
            {items}
        ],
        ClaimResource: """"
    }})
";
            }

            public static string Module(string parent, string name, string items, string icon)
            {
                return $@"
            {{
                Name: ""{name}"",
                Link: """",
                Icon: ""{icon}"",
                Tooltip: """",
                Parent: ""{parent}"",
                Children:
                [
                    {items}
                ],
                ClaimResource: """"
            }},
";
            }


            public static string ModuleItem(
              string className,
              string moduleName,
              string entityName,
              string urlPath,
              string icon,
              string tooltip,
              string parent)
            {
                return $@"
                    {{
                        Name: ""{moduleName} {entityName}"",
                        Link: ""{urlPath}"",
                        Tooltip: ""{tooltip}"",
                        Icon: ""{icon}"",
                        ClaimResource: ""{moduleName}.{entityName}"",
                        Parent: ""{parent}"",
                        ClaimRight: ""Read"",
                        Children: []
                    }},
";
            }

        }
    }
}