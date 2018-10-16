using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Angular2ModelGenerator.Helpers
{
    public class StringHelper
    {
        public static string RegexReplace(string input, params KeyValuePair<string, string>[] replacements)
        { 
            if (replacements.Length == 0)
                return input;

            if (replacements.Length == 1)
                return Regex.Replace(input, replacements[0].Key, replacements[0].Value);

            return RegexReplace(Regex.Replace(input, replacements[0].Key, replacements[0].Value), replacements.Skip(1).ToArray());
        }

        public static string TrimEnd(string input, int length)
        {
            return length > input.Length ? input : input.Substring(0, input.Length - length);
        }

        public static string Spaces(int number)
        {
            return string.Concat(Enumerable.Repeat(" ", number));
        }

        public static string EscapeSpecialCharacters(string input, params string[] patterns)
        {
            if (patterns.Length == 0)
                return input;

            if (patterns.Length == 1)
                return input.Replace(patterns[0], $@"\{patterns[0]}");

            return EscapeSpecialCharacters(input.Replace(patterns[0], $@"\{patterns[0]}"), patterns.Skip(1).ToArray());
        }
    }
}