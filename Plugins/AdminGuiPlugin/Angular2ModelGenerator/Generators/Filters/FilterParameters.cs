using System;
using System.Collections.Generic;

namespace Angular2ModelGenerator.Filters
{
    public class FilterParameters : HashSet<string>
    {
        private static readonly Lazy<FilterParameters> _lazy = new Lazy<FilterParameters>(() => new FilterParameters());

        public static FilterParameters Instance => _lazy.Value;

        private FilterParameters()
        {
        }
    }
}