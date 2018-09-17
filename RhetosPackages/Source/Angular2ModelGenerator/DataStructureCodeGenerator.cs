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
using System;
using System.ComponentModel.Composition;
using System.IO;
using Angular2ModelGenerator.Property;
using Angular2ModelGenerator.SimpleBusinessLogic;

namespace Angular2ModelGenerator
{
    [Export(typeof(IAngular2ModelGenratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(DataStructureInfo))]
    public class DataStructureCodeGenerator : IAngular2ModelGenratorPlugin
    {
        public static readonly CsTag<DataStructureInfo> ValidatorTag = "Validators";
        public static readonly CsTag<DataStructureInfo> PropertiesTag = "Properties";
        public static readonly CsTag<DataStructureInfo> BrowseFieldsTag = "BrowseFieldsTag";
        public static readonly CsTag<DataStructureInfo> SetModelDataTag = "SetModelDataTag";
        public static readonly CsTag<DataStructureInfo> InvalidDataTag = "InvalidDataTag";
        public static readonly CsTag<DataStructureInfo> FiltersTag = "FiltersTag";

        private static string _urlPath = "generic-grid";
        [Obsolete]
        public static bool IsSupported(DataStructureInfo conceptInfo)
        {
            return conceptInfo is IOrmDataStructure
                || conceptInfo is BrowseDataStructureInfo
                || conceptInfo is QueryableExtensionInfo
                || conceptInfo is ComputedInfo
                || conceptInfo is ParameterInfo;
        }


        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            DataStructureInfo info = (DataStructureInfo)conceptInfo;
            codeBuilder.InsertCode(ImplementationCodeSnippet(info));
        }

        public static bool IsEntityType(DataStructureInfo conceptInfo)
        {
            return (conceptInfo is IOrmDataStructure)
                || conceptInfo is BrowseDataStructureInfo
                || conceptInfo is QueryableExtensionInfo
                || conceptInfo is ComputedInfo;
        }

        private static string ImplementationCodeSnippet(DataStructureInfo info)
        {
            string result = string.Format(@"
export class {0}{1} extends BaseEntity implements BaseEntityWithFilters
{{
    {2}
    public ID : string;

    getInstance(): IEmptyConstruct {{ return  {0}{1}; }}
    getNewInstance(): IDataStructure {{ return new {0}{1}(); }}
    getModuleName(): string {{ return ""{0}""; }}
    getEntityName(): string {{ return ""{1}""; }}
    
    public browseFields: Array<IFieldDefinition> = [
        {3}
    ];
    
    public setModelData(modelData: {0}{1}) {{
        if (modelData) {{
            this.ID = modelData.ID;
            {4}
        }}
    }}
    
    getValidators(): {{ [propName: string]: ValidatorDefinition[]; }} {{
        return {{ 
            {6} 
        }};
    }}

    getInvalidDataDefinitions():Array<IInvalidDataFilter> {{
        return [
            {7}
        ];
    }}

    getFilterDefinitions():Array<IFilterDefinition> {{
        return [
            {8}
        ];
    }}
}}
",
                info.Module.Name,
                info.Name,
                PropertiesTag.Evaluate(info),
                BrowseFieldsTag.Evaluate(info),
                SetModelDataTag.Evaluate(info),
                _urlPath,
                ValidatorTag.Evaluate(info),
                InvalidDataTag.Evaluate(info),
                FiltersTag.Evaluate(info)
            );
            // Added as entityProvider only that its Model can be used for form creating.
            AppEntityProviderCodeGenerator.AddEntityProvider(info.Module.Name, info.Name);

            if (IsEntityType(info))
            {
                string InfoMenuItem = string.Format(@"
                    {{
                        Name: ""{0} {1}"",
                        Link: ""{2}/{0}.{1}"",
                        Tooltip: ""{0}{1}"",
                        Icon: ""fa fa-star-o"",
                        ClaimResource: ""{0}.{1}"",
                        Parent: ""Tables/{0}"",
                        ClaimRight: ""Read"",
                        Children: []
                    }},
",
                    info.Module.Name,
                    info.Name,
                    _urlPath);

                AppMenuItemCodeGenerator.AddOrUpdate(info.Module.Name, InfoMenuItem, false);
            }
            return result;
        }

    }
}