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
using Angular2ModelGenerator.Contants;
using Angular2ModelGenerator.Enums;
using Angular2ModelGenerator.Generators.Entities.Base;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Models;
using Angular2ModelGenerator.Templates;
using Rhetos.Dsl.DefaultConcepts;
using Rhetos.Extensibility;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;

namespace Angular2ModelGenerator.Generators.Entities
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(DataStructureInfo))]
    public class DataStructureGenerator : BaseEntityGenerator<DataStructureInfo>
    {
        private readonly MenuItemType _itemType = MenuItemType.Table;
        private readonly string _itemName = "Tables";
        private readonly string _itemIcon = "fa fa-th-large";
        private readonly string _moduleIcon = "fa fa-circle-o";
        private readonly string _moduleItemIcon = "fa fa-star-o";

        protected override string GetClassName(DataStructureInfo info)
        {
            return info.Module.Name + info.Name;
        }

        protected override string GetModuleName(DataStructureInfo info)
        {
            return info.Module.Name;
        }

        protected override string GetEntityName(DataStructureInfo info)
        {
            return info.Name;
        }

        protected override string GenerateGetMethods(DataStructureInfo info)
        {
            if (info is BrowseDataStructureInfo browseInfo)
            {
                return string.Concat(
                    base.GenerateGetMethods(info),
                    EntityTemplates.GetMethods.ParentName(
                        $@"""{browseInfo.Source.Module.Name}.{browseInfo.Source.Name}""",
                        CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.AdditionalFunctions).Evaluate(info)
                    )
                );
            }

            return string.Concat(
                base.GenerateGetMethods(info),
                EntityTemplates.GetMethods.ParentName(
                    "null",
                    CsTagsManager.Instance.Get<DataStructureInfo>(CsTagNames.AdditionalFunctions).Evaluate(info)
                )
            );
        }

        protected override KeyValuePair<MenuItemType, AppMenuItem> GenerateAppMenuItems(DataStructureInfo info)
        {
            if (IsValidType(info))
            {
                var items = EntityTemplates.AppMenuItem.ModuleItem(
                        info.Module.Name + info.Name,
                        info.Module.Name,
                        info.Name,
                        $"{UrlPaths.DataStructure}/{info.Module.Name}.{info.Name}",
                        _moduleItemIcon,
                        info.Module.Name + info.Name,
                        $"{_itemName}/{info.Module.Name}");

                return new KeyValuePair<MenuItemType, AppMenuItem>(_itemType, new AppMenuItem(_itemName, _itemIcon, _moduleIcon)
                {
                    { info.Module.Name, items }
                });
            }

            return new KeyValuePair<MenuItemType, AppMenuItem>(_itemType, null);
        }

        protected override string GenerateIdFieldDefinition(DataStructureInfo info)
        {
            if (IsSimplerDataStructures(info))
            {
                return string.Empty;
            }

            return base.GenerateIdFieldDefinition(info);
        }

        protected override string GenerateIdFieldInitialization(DataStructureInfo info)
        {
            if (IsSimplerDataStructures(info))
            {
                return string.Empty;
            }

            return base.GenerateIdFieldInitialization(info);
        }

        private bool IsSimplerDataStructures(DataStructureInfo info)
        {
            return !DataStructures.Types.AutoId.Any(t => info.GetType().IsInstanceOfType(t));
        }

        private bool IsValidType(DataStructureInfo info)
        {
            return info is IOrmDataStructure
                || info is BrowseDataStructureInfo
                || info is QueryableExtensionInfo
                || info is ComputedInfo;
        }
    }
}