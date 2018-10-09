using Angular2ModelGenerator.Models;
using System;

namespace Angular2ModelGenerator.Generators
{
    public class AdditionCodes
    {
        private static readonly Lazy<AdditionCodes> _lazy = new Lazy<AdditionCodes>(() => new AdditionCodes());

        public static AdditionCodes Instance => _lazy.Value;

        public AppEntityProviders AppEntityProviders { get; }

        public AppMenuItems AppMenuItems { get; }

        private AdditionCodes()
        {
            AppEntityProviders = new AppEntityProviders();
            AppMenuItems = new AppMenuItems();
        }

        public override string ToString()
        {
            return string.Concat(
                AppEntityProviders.ToString(),
                AppMenuItems.ToString()
            );
        }
    }
}