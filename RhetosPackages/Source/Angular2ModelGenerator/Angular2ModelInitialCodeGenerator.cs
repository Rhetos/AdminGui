using System;
using System.Configuration;
using Rhetos.Compiler;
using Rhetos.Dsl;
using System.ComponentModel.Composition;
using Rhetos.Extensibility;
using Angular2ModelGenerator.Generators.Interfaces;

namespace Angular2ModelGenerator
{
    [Export(typeof(IAngular2ModelGeneratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(InitializationConcept))]
    public class Angular2ModelInitialCodeGenerator : IAngular2ModelGeneratorPlugin
    {
        public void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            codeBuilder.InsertCode(CodeSnippet);
        }
        private string CodeSnippet =
            @"import { BaseEntity, IDataStructure, IEmptyConstruct, IFieldDefinition, FieldDefinition, ValidatorDefinition, DataTypeEnum, AppMenuItem, RegexValidatorFactory } from 'basecode/core';
import { AppEntityProvider, BaseEntityWithFilters, IInvalidDataFilter, IFilterDefinition} from './admingui-interface';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';";
    }
}
