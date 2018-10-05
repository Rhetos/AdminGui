using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angular2ModelGenerator.Exceptions
{
    public class TypeScriptException : Exception
    {
        public TypeScriptException(string message) : base(message)
        {
        }
    }
}
