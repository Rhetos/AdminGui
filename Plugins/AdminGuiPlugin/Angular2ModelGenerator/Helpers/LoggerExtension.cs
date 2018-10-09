using Rhetos.Logging;
using System.IO;

namespace Angular2ModelGenerator.Helpers
{
    public static class LoggerExtension
    {
        public static void Trace(this ILogger log, StreamReader streamReader)
        {
            while(!streamReader.EndOfStream)
            {
                string line = streamReader.ReadLine();
                log.Trace(line);
            }
        }

        public static void Error(this ILogger log, StreamReader streamReader)
        {
            while (!streamReader.EndOfStream)
            {
                string line = streamReader.ReadLine();
                log.Error(line);
            }
        }
    }
}
