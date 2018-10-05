namespace Angular2ModelGenerator.Templates
{
    public static class PropertyTemplates
    {
        public static string Definition(string name, string type, string suffix)
        {
            return 
$@"public {name}{suffix} : {type};
    ";
        }

        public static string BrowseFields(string name, string type, string pipe)
        {
            return 
$@"{{ Name: ""{name}"", Title: ""{name}"", Pipe: ""{pipe}"", DataType: DataTypeEnum.{type}, IsFilterEnabled: true }},
        ";
        }

        public static string BrowseReferenceFields(
            string name,
            string type,
            string suffix,
            string pipe,
            string referenceType,
            string spaces = "")
        {
            return 
$@"{{ Name: ""{name}{suffix}"", Title: ""{name}{suffix}"", Pipe: ""{pipe}"", DataType: DataTypeEnum.{type}, IsFilterEnabled: true, ReferenceType: ""{referenceType}"" }},
        ";
        }

        public static string Initialization(string name, string suffix)
        {
            return 
$@"this.{name}{suffix} = modelData.{name}{suffix};
            ";
        }

        public static string Invalid(string name, string module)
        {
            return 
$@"{{ name:"" {name} "", filter: ""{module}.{name}"" }},
            ";
        }

        public static string Invalid(string name, string module, string errorMessage)
        {
            return 
$@"{{ name:"" {name} "", filter: ""{module}.{name}"", message: ""{errorMessage}"" }},
            ";
        }

        public static string ReturnValues(string name, string suffix, string values)
        {
            return 
$@"""{name}{suffix}"":[
                {values}
            ],
            ";
        }
    }
}