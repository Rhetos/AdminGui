namespace Angular2ModelGenerator.Constants
{
    public class RegularExpressions
    {
        public const string DetectEscape = @"""{\d+}""";
        public const string DetectLineTag = @"\n\s*/\*.*?\*/\s*\r?\n";
        public const string DetectTag = @"/\*.*?\*/";
        public const string DetectLastComma = "},\r\n    ];\r\n\r\n";
        public const string DetectLastComma2 = "},\r\n            ],\r\n";
        public const string DetectLastComma3 = "],\r\n        };\r\n";
        public const string DetectLastComma4 = "},\r\n        ];";
        public const string Decimal = "^-?[0-9]+(\\.[0-9]+)?$";
    }
}