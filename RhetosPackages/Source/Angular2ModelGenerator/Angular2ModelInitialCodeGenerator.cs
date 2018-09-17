using System;
using System.Configuration;
using Rhetos.Compiler;
using Rhetos.Dsl;
using System.ComponentModel.Composition;
using Rhetos.Extensibility;

namespace Angular2ModelGenerator
{
    [Export(typeof(IAngular2ModelGenratorPlugin))]
    [ExportMetadata(MefProvider.Implements, typeof(InitializationConcept))]
    public class Angular2ModelInitialCodeGenerator : IAngular2ModelGenratorPlugin
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
