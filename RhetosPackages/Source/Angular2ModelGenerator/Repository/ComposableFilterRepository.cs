using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Angular2ModelGenerator.Property;
using Rhetos.Dsl.DefaultConcepts;

namespace Angular2ModelGenerator.Repository
{
    class ComposableFilterRepository
    {
        private static List<ComposableFilterByInfo> listComposableFilters = new List<ComposableFilterByInfo>();

        public static void Add(ComposableFilterByInfo _object)
        {
            listComposableFilters.Add(_object);
        }

        public static bool CompareExist(string parameter)
        {
            if (listComposableFilters.Find(obj => obj.Parameter == parameter) == null)
            {
                return true;
            }
            else return false;
        }
    }
}
