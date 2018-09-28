using Angular2ModelGenerator.Enums;
using Angular2ModelGenerator.Templates;
using System.Collections.Generic;
using System.Linq;

namespace Angular2ModelGenerator.Models
{
    public class AppMenuItems : Dictionary<MenuItemType, AppMenuItem>
    {
        public void AddOrUpdate(MenuItemType type, AppMenuItem menuItems)
        {
            if (!ContainsKey(type))
            {
                Add(type, menuItems);
            }
            else
            {
                foreach (var key in menuItems.Keys)
                {
                    this[type].AddOrUpdate(key, menuItems[key]);
                }
            }
        }

        public override string ToString()
        {
            return string.Concat(
                string.Concat(this.OrderBy(i => i.Key).Select(i => i.Value.ToString())),
                EntityTemplates.AppMenuItem.Export
            );
        }
    }
}