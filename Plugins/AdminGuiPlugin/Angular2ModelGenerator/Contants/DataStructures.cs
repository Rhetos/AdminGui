using Rhetos.Dsl.DefaultConcepts;
using System;

namespace Angular2ModelGenerator.Contants
{
    public class DataStructures
    {
        public class Types
        {
            public static readonly Type[] AutoId = new Type[]
            {
                typeof(PolymorphicInfo),
                typeof(ComputedInfo),
                typeof(QueryableExtensionInfo),
                typeof(SqlQueryableInfo),
                typeof(LegacyEntityWithAutoCreatedViewInfo),
                typeof(LegacyEntityInfo),
                typeof(BrowseDataStructureInfo),
                typeof(EntityInfo)
            };
        }
    }
}