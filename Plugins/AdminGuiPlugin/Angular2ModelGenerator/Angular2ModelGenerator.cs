using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Exceptions;
using Angular2ModelGenerator.Generators;
using Angular2ModelGenerator.Generators.Interfaces;
using Angular2ModelGenerator.Helpers;
using Angular2ModelGenerator.Models;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Extensibility;
using Rhetos.Logging;
using Rhetos.Utilities;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Diagnostics;
using System.IO;

namespace Angular2ModelGenerator
{
    [Export(typeof(IGenerator))]
    public class Angular2ModelGenerator : IGenerator
    {
        private const string assemblyName = "Rhetos.Angular2.ts";

        private readonly IPluginsContainer<IAngular2ModelGeneratorPlugin> _plugins;
        private readonly ICodeGenerator _codeGenerator;
        private readonly IAssemblyGenerator _assemblyGenerator;
        private readonly ILogger _performanceLogger;
        private readonly ILogger _logger;

        private readonly string _sourceFile = Path.Combine(Paths.ResourcesFolder, "AdminGuiCompile/scripts/models", assemblyName);
        private readonly string _compliedSourceFile = Path.Combine(Paths.ResourcesFolder, "AdminGuiCompile/dist/admingui.js");
        private readonly string _compliedDestinationFile = Path.Combine(Paths.ResourcesFolder, "AdminGui/js/admingui.js");

        private readonly KeyValuePair<string, string>[] _replacements = new KeyValuePair<string, string>[]
        {
            new KeyValuePair<string, string>(RegularExpressions.DetectLineTag, "\n"),
            new KeyValuePair<string, string>(RegularExpressions.DetectTag, ""),
            new KeyValuePair<string, string>(RegularExpressions.DetectLastComma, "}\r\n    ];\r\n\r\n"),
            new KeyValuePair<string, string>(RegularExpressions.DetectLastComma2, "}\r\n            ],\r\n"),
            new KeyValuePair<string, string>(RegularExpressions.DetectLastComma3, "]\r\n        };\r\n"),
            new KeyValuePair<string, string>(RegularExpressions.DetectLastComma4, "}\r\n        ];")
        };

        public IEnumerable<string> Dependencies => null;

        public Angular2ModelGenerator(
            IPluginsContainer<IAngular2ModelGeneratorPlugin> plugins,
            ICodeGenerator codeGenerator,
            IAssemblyGenerator assemblyGenerator,
            ILogProvider logProvider
        )
        {
            _plugins = plugins;
            _codeGenerator = codeGenerator;
            _assemblyGenerator = assemblyGenerator;
            _performanceLogger = logProvider.GetLogger("Performance");
            _logger = logProvider.GetLogger(GetType().Name);
        }

        public void Generate()
        {
            var stopwatch = Stopwatch.StartNew();
            var assemblySource = GenerateSource();

            File.WriteAllText(_sourceFile, assemblySource.GeneratedCode);

            CompileFileTS();
            CopyCompiledFile();

            _performanceLogger.Write(stopwatch, "Angular2ModelGenerator.Generate");
        }

        private void CompileFileTS()
        {
            var arguments = $"/C cd /d {Paths.ResourcesFolder}/AdminGuiCompile/scripts & npm install --loglevel=error & npm run tsc";
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = arguments,
                    CreateNoWindow = true,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };

            _logger.Info("Compiling TypeScript model file.");
            
            process.Start();
            try
            {
                _logger.Info(process.StandardOutput);
                if (process.StandardError.Peek() > -1)
                {
                    _logger.Error(process.StandardError);
                    throw new TypeScriptException("Compiling TypeScript models failed.");
                }
            }
            finally
            {
                process.WaitForExit();
            }
        }

        private void CopyCompiledFile()
        {
            File.Copy(_compliedSourceFile, _compliedDestinationFile, true);
        }

        private SimpleAssemblySource GenerateSource()
        {
            var generatedSource = _codeGenerator.ExecutePlugins(_plugins, "/*", "*/", null);

            return new SimpleAssemblySource
            {
                GeneratedCode = string.Concat(
                    InitialTemplates.Import,
                    StringHelper.RegexReplace(generatedSource.GeneratedCode, _replacements),
                    AdditionCodes.Instance.ToString()),
                RegisteredReferences = generatedSource.RegisteredReferences
            };
        }
    }
}