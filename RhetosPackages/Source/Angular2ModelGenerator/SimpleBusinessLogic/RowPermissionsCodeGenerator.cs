﻿/*
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
using System.ComponentModel.Composition;
using Angular2ModelGenerator.Property;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Constants;

namespace Angular2ModelGenerator.SimpleBusinessLogic
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(RowPermissionsReadInfo))]
    public class RowPermissionsCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            var info = (RowPermissionsReadInfo)conceptInfo;
            codeBuilder.InsertCode(RowPermissionsCodeSnippet(info), CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.AdditionalFunctions), info.Source);
        }

        private static string RowPermissionsCodeSnippet(RowPermissionsReadInfo info)
        {
            return @"private getHasReadRowPermissions(DataStructure: IEmptyConstruct): boolean { return true; }
                ";
        }
    }
}