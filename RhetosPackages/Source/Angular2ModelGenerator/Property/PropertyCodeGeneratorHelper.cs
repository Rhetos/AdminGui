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

using System;
using System.Text.RegularExpressions;
using Rhetos.Compiler;
using Rhetos.Dsl.DefaultConcepts;
using Angular2ModelGenerator.SimpleBusinessLogic;

namespace Angular2ModelGenerator.Property
{
    public static class PropertyCodeGeneratorHelper
    {
        public static readonly CsTag<PropertyInfo> ReturnTag = "Return";
        public static void GenerateCodeForType(PropertyInfo info, ICodeBuilder codeBuilder, string type, string nameSuffix = "", string referenceType = "")
        {
            codeBuilder.InsertCode(PropertyCodeSnippet(info, type, nameSuffix), DataStructureCodeGenerator.PropertiesTag, info.DataStructure);

            if (nameSuffix != "")
                codeBuilder.InsertCode(BrowseReferenceFieldsTagCodeSnippet(info, type, nameSuffix, referenceType), DataStructureCodeGenerator.BrowseFieldsTag, info.DataStructure);
            else
                codeBuilder.InsertCode(BrowseFieldsTagCodeSnippet(info, type), DataStructureCodeGenerator.BrowseFieldsTag, info.DataStructure);

            codeBuilder.InsertCode(SetModelCodeSnippet(info, type, nameSuffix), DataStructureCodeGenerator.SetModelDataTag, info.DataStructure);
            codeBuilder.InsertCode(ReturnValidatorCodeSnippet(info, type, nameSuffix), DataStructureCodeGenerator.ValidatorTag, info.DataStructure);
        }

        public static void GenerateCodeForInvalidData(InvalidDataInfo info, ICodeBuilder codeBuilder)
        {
            codeBuilder.InsertCode(InvalidCodeSnippet(info), DataStructureCodeGenerator.InvalidDataTag, info.Source);
        }
        private static string PropertyCodeSnippet(PropertyInfo info, string type, string nameSuffix)
        {
            return string.Format(
                @"public {0}{2} : {1};
    ",
                info.Name,
                (type == "datetime" || type == "longstring") ? "string" : ( type== "binary" ? "any" : type),
                nameSuffix);
        }

        private static string BrowseFieldsTagCodeSnippet(PropertyInfo info, string type)
        {
            return string.Format(
                @"{{ Name: ""{0}"", Title: ""{0}"", Pipe: ""{2}"", DataType: DataTypeEnum.{1}, IsFilterEnabled: true }},
        ",
                info.Name,
                type,
                type == "datetime" ? "msDate" : "");
        }

        private static string BrowseReferenceFieldsTagCodeSnippet(PropertyInfo info, string type, string nameSuffix, string referenceType)
        {
            return string.Format(
                @"{{ Name: ""{0}{2}"", Title: ""{0}{2}"", Pipe: ""{3}"", DataType: DataTypeEnum.{1}, IsFilterEnabled: true, ReferenceType: ""{4}"" }},
        ",
                info.Name,
                type,
                nameSuffix,
                type == "datetime" ? "msDate" : "",
                referenceType);
        }


        private static string SetModelCodeSnippet(PropertyInfo info, string type, string nameSuffix)
        {
            return string.Format(
                 @"this.{0}{2} = modelData.{0}{2};
            ",
                info.Name,
                type,
                nameSuffix);
        }

        private static string ReturnValidatorCodeSnippet(PropertyInfo info, string type, string nameSuffix)
        {
            string result = "";
            result = string.Format(@"""{0}{2}"":[
                {3}
            ],
            ",
            info.Name,
            type,
            nameSuffix,
            PropertyCodeGeneratorHelper.ReturnTag.Evaluate(info));
            return result;
        }

        private static string InvalidCodeSnippet(InvalidDataInfo info)
        {
            string result = "";
            const string detectEscape = @"""{\d+}""";
            info.ErrorMessage = Regex.Replace(info.ErrorMessage, detectEscape, delegate (Match m) {
                return m.Value.Replace("\"", "");
            });
            if ( info.ErrorMessage.Length == 0 )
                result = string.Format(@"{{ name:"" {0} "", filter: ""{1}.{0}"" }},
            ",
                info.FilterType.Contains(".") ? info.FilterType.Split('.')[1] : info.FilterType,
                info.Source.Module.Name);
            else
                result = string.Format(@"{{ name:"" {0} "", filter: ""{1}.{0}"", message: ""{2}"" }},
            ",
               info.FilterType.Contains(".") ? info.FilterType.Split('.')[1] : info.FilterType,
               info.Source.Module.Name,
               info.ErrorMessage);
            return result;
        }
    }
}