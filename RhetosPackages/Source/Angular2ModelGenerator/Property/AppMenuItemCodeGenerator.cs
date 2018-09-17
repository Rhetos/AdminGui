using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
namespace Angular2ModelGenerator.Property
{
    public static class AppMenuItemCodeGenerator
    {
        private static List<string> listItem = new List<string>();
        private static Dictionary<string, string> MenuItemDic = new Dictionary<string, string>();
        private static Dictionary<string, string> ComputationItemDic = new Dictionary<string, string>();
        private static string initialExportClass = @"
@Injectable()
export class AllMenuItemModels{}";

        private static string initialRoot = @"
@AppMenuItem(
    {{
        Name: ""{0}"",
        Link: """",
        Icon: ""{2}"",
        Tooltip: """",
        Children:
        [
            {1}
        ],
        ClaimResource: """"
    }})
";

        private static string initialModule = @"
            {{
                Name: ""{1}"",
                Link: """",
                Icon: ""{3}"",
                Tooltip: """",
                Parent: ""{0}"",
                Children:
                [
                    {2}
                ],
                ClaimResource: """"
            }},
";


        public static string GenerateMenuItemProvider()
        {
            return MenuGenerator("Tables", "fa fa-th-large", "fa fa-circle-o") + MenuGenerator("Computations", "fa fa-pencil-square-o", "fa fa-pencil-square") + initialExportClass;
        }

        private static string MenuGenerator(string root, string rootIcon, string childIcon)
        {
            Dictionary<string, string> itemDic = (root == "Computations") ? ComputationItemDic : MenuItemDic;

            string result = "";
            string ListMenuItem = "";
            int count = itemDic.Count;

            result += initialRoot;
            foreach (string key in itemDic.Keys)
            {
                ListMenuItem += string.Format(initialModule, root, key, itemDic[key].Substring(0, itemDic[key].Length - 3), childIcon);

            }

            if(ListMenuItem!="")
                ListMenuItem = ListMenuItem.Substring(0, ListMenuItem.Length - 3);

            return string.Format(initialRoot, root, ListMenuItem, rootIcon);
        }

        public static void AddMenuItemChildren(string _infoMenuItem)
        {
            listItem.Add(_infoMenuItem);
        }

        public static void AddOrUpdate(string key, string addValue, bool isComputation)
        {
            string val;
            if (isComputation)
            {
                if (ComputationItemDic.TryGetValue(key, out val))
                {
                    ComputationItemDic[key] = val + addValue;
                }
                else
                {
                    ComputationItemDic.Add(key, addValue);
                }
            }
            else
            {
                if (MenuItemDic.TryGetValue(key, out val))
                {
                    MenuItemDic[key] = val + addValue;
                }
                else
                {
                    MenuItemDic.Add(key, addValue);
                }
            }
        }
    }
}
