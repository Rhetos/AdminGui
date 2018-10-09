using Angular2ModelGenerator.Helpers;
using Angular2ModelGenerator.Templates;
using System.Collections.Generic;
using System.Linq;

namespace Angular2ModelGenerator.Models
{
    public class AppMenuItem : Dictionary<string, string>
    {
        private readonly string _name;
        private readonly string _icon;
        private readonly string _moduleIcon;

        public AppMenuItem(string name, string icon, string moduleIcon)
        {
            _name = name;
            _icon = icon;
            _moduleIcon = moduleIcon;
        }

        public void AddOrUpdate(string key, string value)
        {
            if (!ContainsKey(key))
                Add(key, string.Empty);

            this[key] += value;
        }

        public override string ToString()
        {
            var modules = string.Concat(this.Select(i => EntityTemplates.AppMenuItem.Module(_name, i.Key, StringHelper.TrimEnd(i.Value, 3), _moduleIcon)));

            return EntityTemplates.AppMenuItem.Container(_name, StringHelper.TrimEnd(modules, 3), _icon);
        }
    }
}