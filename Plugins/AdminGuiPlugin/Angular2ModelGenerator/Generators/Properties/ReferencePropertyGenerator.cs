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

using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Generators.Properties.Base;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Generators.Properties
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(ReferencePropertyInfo))]
    public class ReferencePropertyGenerator : BasePropertyGenerator<ReferencePropertyInfo>, IAngular2ModelGeneratorPlugin
    {
        protected override string PropertyNameSuffix => "ID";

        protected override string GetPropertyType(ReferencePropertyInfo info)
        {
            return TypeScript.Types.String;
        }

        protected override string GetReferenceType(ReferencePropertyInfo info)
        {
            return info.Referenced.ToString();
        }
    }
}