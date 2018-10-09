namespace Angular2ModelGenerator.Templates
{
    public class InitialTemplates
    {
        public const string Import =
@"import { BaseEntity, IDataStructure, IEmptyConstruct, IFieldDefinition, FieldDefinition, ValidatorDefinition, DataTypeEnum, AppMenuItem, RegexValidatorFactory } from 'basecode/core';
import { AppEntityProvider, BaseEntityWithFilters, IInvalidDataFilter, IFilterDefinition} from './admingui-interface';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';";
    }
}