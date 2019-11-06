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
using Angular2ModelGenerator.Enums;
using Angular2ModelGenerator.Generators.Entities.Base;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Models;
using Angular2ModelGenerator.Templates;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.Collections.Generic;
using System.ComponentModel.Composition;

namespace Angular2ModelGenerator.Generators.Entities
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(EntityComputedFromInfo))]
    public class ComputedStructureGenerator : BaseEntityGenerator<EntityComputedFromInfo>
    {
        private readonly MenuItemType _itemType = MenuItemType.Computation;
        private readonly string _itemName = "Computations";
        private readonly string _itemIcon = "fa fa-pencil-square-o";
        private readonly string _moduleIcon = "fa fa-pencil-square";
        private readonly string _moduleItemIcon = "fa fa-futbol-o";

        protected override string GetClassName(EntityComputedFromInfo info)
        {
            return $"{info.Source.Module.Name}{info.Source.Name}_{info.Target.Name}";
        }

        protected override string GetModuleName(EntityComputedFromInfo info)
        {
            return info.Target.Module.Name;
        }

        protected override string GetEntityName(EntityComputedFromInfo info)
        {
            return info.Target.Name;
        }

        protected override KeyValuePair<MenuItemType, AppMenuItem> GenerateAppMenuItems(EntityComputedFromInfo info)
        {
            var items = EntityTemplates.AppMenuItem.ModuleItem(
                    $"{info.Source.Module.Name}{info.Source.Name}_{info.Target.Name}",
                    info.Target.Module.Name,
                    info.Target.Name,
                    $"{UrlPaths.ComputedStructure}/{info.Source.Module.Name}_{info.Source.Name}.{info.Target.Name}",
                    _moduleItemIcon,
                    $"{info.Source.Module.Name}_{info.Target.Name}",
                    $"{_itemName}/{info.Target.Module.Name}.{info.Source.Name}");

            return new KeyValuePair<MenuItemType, AppMenuItem>(_itemType, new AppMenuItem(_itemName, _itemIcon, _moduleIcon)
            {
                { $"{info.Source.Module.Name}.{info.Source.Name}", items }
            });
        }
    }
}