namespace Angular2ModelGenerator.Templates
{
    public class ValidatorTemplates
    {
        public static string MaxLength(string propertyName, string length)
        {
            return $@"{{Validator :Validators.maxLength({length}), ErrorCode: 'maxlength', ErrorMessage: '{propertyName} has maximum length of {length} characters' }},
                ";
        }

        public static string MinLength(string propertyName, string length)
        {
            return $@"{{Validator :Validators.minLength({length}), ErrorCode: 'minlength', ErrorMessage: '{propertyName} has minimum length of {length} characters' }},
                ";
        }

        public static string Regex(string regex, string errorMessage)
        {
            return $@"{{Validator: RegexValidatorFactory('{regex}'), ErrorCode: 'notMatchingRegex', ErrorMessage: '{errorMessage}' }},
                ";
        }

        public static string Required(string propertyName)
        {
            return $@"{{Validator :Validators.required, ErrorCode: 'required', ErrorMessage: '{propertyName} is required' }},
                ";
        }

        public static string Decimal(string regex, string errorMessage)
        {
            return $@"{{Validator: RegexValidatorFactory('{regex}'), ErrorCode: 'notMatchingRegex', ErrorMessage: '{errorMessage}'}},
                ";
        }
    }
}