using Rhetos.Compiler;
using Rhetos.Dsl;
using System;
using System.Collections.Concurrent;

using Angular2ModelGenerator.Generators.Interfaces; namespace Angular2ModelGenerator
{
    public class CsTagsManager
    {
        private static readonly Lazy<CsTagsManager> _lazy = new Lazy<CsTagsManager>(() => new CsTagsManager());

        public static CsTagsManager Instance => _lazy.Value;

        private readonly ConcurrentDictionary<string, object> _tags;

        private CsTagsManager()
        {
            _tags = new ConcurrentDictionary<string, object>();
        }

        public CsTag<T> Get<T>(string name) where T : IConceptInfo
        {
            return (CsTag<T>)_tags.GetOrAdd(typeof(T).Name + name, key => new CsTag<T>(name));
        }
    }
}