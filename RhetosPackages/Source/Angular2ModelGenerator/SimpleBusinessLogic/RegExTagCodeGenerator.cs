/*
    Copyright (C) 2014 Omega software d.o.o.

    This file is part of Rhetos.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

using Rhetos.Compiler;
using Rhetos.Dsl;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using Rhetos.Utilities;
using System.ComponentModel.Composition;
using Angular2ModelGenerator.Property;
using Angular2ModelGenerator.Generators.Interfaces;

namespace Angular2ModelGenerator.SimpleBusinessLogic
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(RegExMatchInfo))]
    public class RegExTagCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            var info = (RegExMatchInfo)conceptInfo;
            codeBuilder.InsertCode(ValidatorsCodeSnippet(info), PropertyCodeGeneratorHelper.ReturnTag, info.Property);
            
        }
        private static string ValidatorsCodeSnippet(RegExMatchInfo info)
        {
            string result = string.Format(
                @"{{Validator: RegexValidatorFactory(""{1}""), ErrorCode: 'notMatchingRegex', ErrorMessage: ""{2}"" }},
                ",
                info.Property.Name,
                info.RegularExpression.Replace("\\","\\\\"),
                info.ErrorMessage);
            return result;
        }
    }
}