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
    [ExportMetadata(MefProvider.Implements, typeof(EntityComputedFromInfo))]
    public class PersistedStructureCodeGenerator : IAngular2ModelGenratorPlugin
    {
        public static readonly CsTag<EntityComputedFromInfo> ValidatorTag = "Validators";
        public static readonly CsTag<EntityComputedFromInfo> PropertiesTag = "Properties";
        public static readonly CsTag<EntityComputedFromInfo> BrowseFieldsTag = "BrowseFieldsTag";
        public static readonly CsTag<EntityComputedFromInfo> SetModelDataTag = "SetModelDataTag";
        public static readonly CsTag<EntityComputedFromInfo> InvalidDataTag = "InvalidDataTag";
        public static readonly CsTag<EntityComputedFromInfo> FiltersTag = "FiltersTag";

        private static string _urlPath = "computed";
        

        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            EntityComputedFromInfo info = (EntityComputedFromInfo)conceptInfo;
            codeBuilder.InsertCode(ImplementationCodeSnippet(info));
        }


        private static string ImplementationCodeSnippet(EntityComputedFromInfo info)
        {
            string result = string.Format(@"
export class {0}_{1} extends BaseEntity implements BaseEntityWithFilters
{{
    {3}
    public ID : string;

    getInstance(): IEmptyConstruct {{ return  {0}_{1}; }}
    getNewInstance(): IDataStructure {{ return new {0}_{1}(); }}
    getModuleName(): string {{ return ""{2}""; }}
    getEntityName(): string {{ return ""{1}""; }}
    
    public browseFields: Array<IFieldDefinition> = [
        {4}
    ];

    public setModelData(modelData: {0}_{1}) {{
        if (modelData) {{
            this.ID = modelData.ID;
            {5}
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
                info.Source.Module+info.Source.Name,
                info.Target.Name,
                info.Target.Module.Name,
                PropertiesTag.Evaluate(info),
                BrowseFieldsTag.Evaluate(info),
                SetModelDataTag.Evaluate(info),
                ValidatorTag.Evaluate(info),
                InvalidDataTag.Evaluate(info),
                FiltersTag.Evaluate(info)             
            );
            // Added as entityProvider only that its Model can be used for form creating.
            AppEntityProviderCodeGenerator.AddEntityProvider(info.Target.Module.Name, info.Target.Name);

           
                string InfoMenuItem = string.Format(@"
                    {{
                        Name: ""{0} {1}"",
                        Link: ""{3}/{0}_{2}.{1}"",
                        Tooltip: ""{0}_{1}"",
                        Icon: ""fa fa-futbol-o"",
                        ClaimResource: ""{0}.{1}"",
                        Parent: ""Computations/{0}.{2}"",
                        ClaimRight: ""Read"",
                        Children: []
                    }},
",
                    info.Target.Module.Name,
                    info.Target.Name,
                    info.Source.Name,
                    _urlPath);

            AppMenuItemCodeGenerator.AddOrUpdate(info.Source.Module + "." + info.Source.Name, InfoMenuItem, true);
            return result;
        }
      
    }
}