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

using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Generators.Validators.Base;
using Angular2ModelGenerator.Templates;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Generators.Validators
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(MinLengthInfo))]
    public class MinLengthValidatorGenerator : BaseValidatorGenerator<MinLengthInfo>
    {
        protected override string GenerateCode(MinLengthInfo info)
        {
            return ValidatorTemplates.MinLength(info.Property.Name, info.Length);
        }

        protected override PropertyInfo GetConceptInfo(MinLengthInfo info)
        {
            return info.Property;
        }
    }
}