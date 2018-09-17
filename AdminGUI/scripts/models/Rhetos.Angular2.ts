
import { BaseEntity, IDataStructure, IFieldDefinition, FieldDefinition, ValidatorDefinition, DataTypeEnum, AppMenuItem, RegexValidatorFactory } from 'basecode/core';
import { AppEntityProvider, BaseEntityWithFilters } from './admingui-interface';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

export class CommonGetClaims extends BaseEntity implements BaseEntityWithFilters
{
    public ClaimResource : string;
    public ID : string;

    getNewInstance(): CommonGetClaims { return new CommonGetClaims(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "GetClaims"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ClaimResource", Title: "ClaimResource", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonGetClaims) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ClaimResource = modelData.ClaimResource;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ClaimResource":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonClaim extends BaseEntity implements BaseEntityWithFilters
{
    public ClaimResource : string;
    public ClaimRight : string;
    public Active : boolean;
    public ID : string;

    getNewInstance(): CommonClaim { return new CommonClaim(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "Claim"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ClaimResource", Title: "ClaimResource", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ClaimRight", Title: "ClaimRight", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Active", Title: "Active", Pipe: "", DataType: DataTypeEnum.boolean, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonClaim) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ClaimResource = modelData.ClaimResource;
            this.ClaimRight = modelData.ClaimRight;
            this.Active = modelData.Active;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ClaimResource":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "ClaimResource is required" }
            ],
            "ClaimRight":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "ClaimRight is required" }
            ],
            "Active":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredActive ", filter: "Common.SystemRequiredActive", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredActive ", filter: "Common.SystemRequiredActive", isComposableFilter: true }
        ];
    }
}


export class CommonMyAccount extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonMyAccount { return new CommonMyAccount(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "MyAccount"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonMyAccount) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonPrincipal extends BaseEntity implements BaseEntityWithFilters
{
    public Name : string;
    public AspNetUserId : number;
    public ID : string;

    getNewInstance(): CommonPrincipal { return new CommonPrincipal(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "Principal"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Name", Title: "Name", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "AspNetUserId", Title: "AspNetUserId", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonPrincipal) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Name = modelData.Name;
            this.AspNetUserId = modelData.AspNetUserId;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Name":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Name is required" }
            ],
            "AspNetUserId":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredAspNetUserId ", filter: "Common.SystemRequiredAspNetUserId", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" MyAccount ", filter: "Common.MyAccount", isComposableFilter: true },
            { name:" SystemRequiredAspNetUserId ", filter: "Common.SystemRequiredAspNetUserId", isComposableFilter: true }
        ];
    }
}


export class CommonGetUserInfo extends BaseEntity implements BaseEntityWithFilters
{
    public UserName : string;
    public HasRole : string;
    public ID : string;

    getNewInstance(): CommonGetUserInfo { return new CommonGetUserInfo(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "GetUserInfo"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "UserName", Title: "UserName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "HasRole", Title: "HasRole", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonGetUserInfo) {
        if (modelData) {
            this.ID = modelData.ID;
            this.UserName = modelData.UserName;
            this.HasRole = modelData.HasRole;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "UserName":[
            ],
            "HasRole":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" CurrentUser ", filter: "Common.CurrentUser", isComposableFilter: true }
        ];
    }
}


export class CommonPrincipalHasRole extends BaseEntity implements BaseEntityWithFilters
{
    public PrincipalID : string;
    public RoleID : string;
    public ID : string;

    getNewInstance(): CommonPrincipalHasRole { return new CommonPrincipalHasRole(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "PrincipalHasRole"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "PrincipalID", Title: "PrincipalID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "RoleID", Title: "RoleID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonPrincipalHasRole) {
        if (modelData) {
            this.ID = modelData.ID;
            this.PrincipalID = modelData.PrincipalID;
            this.RoleID = modelData.RoleID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "PrincipalID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Principal is required" }
            ],
            "RoleID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Role is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredPrincipal ", filter: "Common.SystemRequiredPrincipal", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredPrincipal ", filter: "Common.SystemRequiredPrincipal", isComposableFilter: true }
        ];
    }
}


export class CommonRole extends BaseEntity implements BaseEntityWithFilters
{
    public Name : string;
    public ID : string;

    getNewInstance(): CommonRole { return new CommonRole(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "Role"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Name", Title: "Name", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonRole) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Name = modelData.Name;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Name":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Name is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonCurrentUser extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonCurrentUser { return new CommonCurrentUser(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "CurrentUser"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonCurrentUser) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolStudent extends BaseEntity implements BaseEntityWithFilters
{
    public MSSV : string;
    public Name : string;
    public Age : number;
    public Father_Age : number;
    public ID : string;

    getNewInstance(): SchoolStudent { return new SchoolStudent(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Student"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "MSSV", Title: "MSSV", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Name", Title: "Name", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Age", Title: "Age", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true },
        { Name: "Father_Age", Title: "Father_Age", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true }
    ];

    public setModelData(modelData: SchoolStudent) {
        if (modelData) {
            this.ID = modelData.ID;
            this.MSSV = modelData.MSSV;
            this.Name = modelData.Name;
            this.Age = modelData.Age;
            this.Father_Age = modelData.Father_Age;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "MSSV":[
                {Validator: RegexValidatorFactory("\\d{8}"), ErrorCode: 'notMatchingRegex', ErrorMessage: "Length string must be 8." }
            ],
            "Name":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Name is required" },
                {Validator :Validators.minLength(4), ErrorCode: 'minlength', ErrorMessage: "Name has minimum length of 4 characters" },
                {Validator :Validators.maxLength(12), ErrorCode: 'maxlength', ErrorMessage: "Name has maximum length of 12 characters" }
            ],
            "Age":[
            ],
            "Father_Age":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" CheckAge ", filter: "School.CheckAge", message: "Father has to be older han student." },
            { name:" Name_MaxLengthFilter ", filter: "School.Name_MaxLengthFilter", message: "Maximum allowed length of {0} is {1} characters." },
            { name:" Name_MinLengthFilter ", filter: "School.Name_MinLengthFilter", message: "Minimum allowed length of {0} is {1} characters." },
            { name:" Age_MaxValueFilter ", filter: "School.Age_MaxValueFilter", message: "Maximum value of {0} is {1}." },
            { name:" Age_MinValueFilter ", filter: "School.Age_MinValueFilter", message: "Minimum value of {0} is {1}." },
            { name:" MSSV_RegExMatchFilter ", filter: "School.MSSV_RegExMatchFilter", message: "Length string must be 8." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" XXX ", filter: "School.XXX", isComposableFilter: true },
            { name:" FilterByPrefix ", filter: "School.FilterByPrefix", isComposableFilter: false },
            { name:" CheckAge2 ", filter: "School.CheckAge2", isComposableFilter: true },
            { name:" CheckAge ", filter: "School.CheckAge", isComposableFilter: true }
        ];
    }
}


export class SchoolTeacher extends BaseEntity implements BaseEntityWithFilters
{
    public Name : string;
    public StudentID : string;
    public Age : number;
    public ID : string;

    getNewInstance(): SchoolTeacher { return new SchoolTeacher(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Teacher"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Name", Title: "Name", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "StudentID", Title: "StudentID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Age", Title: "Age", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true }
    ];

    public setModelData(modelData: SchoolTeacher) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Name = modelData.Name;
            this.StudentID = modelData.StudentID;
            this.Age = modelData.Age;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Name":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Name is required" }
            ],
            "StudentID":[
            ],
            "Age":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" Age_MaxValueFilter ", filter: "School.Age_MaxValueFilter", message: "Maximum value of {0} is {1}." },
            { name:" Age_MinValueFilter ", filter: "School.Age_MinValueFilter", message: "Minimum value of {0} is {1}." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" ComposableFilterByContains ", filter: "School.ComposableFilterByContains", isComposableFilter: true }
        ];
    }
}


export class SchoolXXX extends BaseEntity implements BaseEntityWithFilters
{
    public Test123 : string;
    public ID : string;

    getNewInstance(): SchoolXXX { return new SchoolXXX(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "XXX"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Test123", Title: "Test123", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: SchoolXXX) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Test123 = modelData.Test123;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Test123":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Test123 is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolFilterByPrefix extends BaseEntity implements BaseEntityWithFilters
{
    public Prefix : string;
    public ID : string;

    getNewInstance(): SchoolFilterByPrefix { return new SchoolFilterByPrefix(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "FilterByPrefix"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Prefix", Title: "Prefix", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: SchoolFilterByPrefix) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Prefix = modelData.Prefix;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Prefix":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolComposableFilterByContains extends BaseEntity implements BaseEntityWithFilters
{
    public Pattern : string;
    public ID : string;

    getNewInstance(): SchoolComposableFilterByContains { return new SchoolComposableFilterByContains(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "ComposableFilterByContains"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Pattern", Title: "Pattern", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: SchoolComposableFilterByContains) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Pattern = modelData.Pattern;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Pattern":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonAutoCodeCache extends BaseEntity implements BaseEntityWithFilters
{
    public Entity : string;
    public Property : string;
    public Grouping : string;
    public Prefix : string;
    public MinDigits : number;
    public LastCode : number;
    public ID : string;

    getNewInstance(): CommonAutoCodeCache { return new CommonAutoCodeCache(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "AutoCodeCache"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Entity", Title: "Entity", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Property", Title: "Property", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Grouping", Title: "Grouping", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Prefix", Title: "Prefix", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "MinDigits", Title: "MinDigits", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true },
        { Name: "LastCode", Title: "LastCode", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonAutoCodeCache) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Entity = modelData.Entity;
            this.Property = modelData.Property;
            this.Grouping = modelData.Grouping;
            this.Prefix = modelData.Prefix;
            this.MinDigits = modelData.MinDigits;
            this.LastCode = modelData.LastCode;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Entity":[
            ],
            "Property":[
            ],
            "Grouping":[
            ],
            "Prefix":[
            ],
            "MinDigits":[
            ],
            "LastCode":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonFilterId extends BaseEntity implements BaseEntityWithFilters
{
    public Handle : string;
    public Value : string;
    public ID : string;

    getNewInstance(): CommonFilterId { return new CommonFilterId(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "FilterId"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Handle", Title: "Handle", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Value", Title: "Value", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonFilterId) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Handle = modelData.Handle;
            this.Value = modelData.Value;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Handle":[
            ],
            "Value":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonKeepSynchronizedMetadata extends BaseEntity implements BaseEntityWithFilters
{
    public Target : string;
    public Source : string;
    public Context : string;
    public ID : string;

    getNewInstance(): CommonKeepSynchronizedMetadata { return new CommonKeepSynchronizedMetadata(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "KeepSynchronizedMetadata"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Target", Title: "Target", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Source", Title: "Source", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Context", Title: "Context", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonKeepSynchronizedMetadata) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Target = modelData.Target;
            this.Source = modelData.Source;
            this.Context = modelData.Context;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Target":[
            ],
            "Source":[
            ],
            "Context":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonExclusiveLock extends BaseEntity implements BaseEntityWithFilters
{
    public ResourceType : string;
    public ResourceID : string;
    public UserName : string;
    public Workstation : string;
    public LockStart : string;
    public LockFinish : string;
    public ID : string;

    getNewInstance(): CommonExclusiveLock { return new CommonExclusiveLock(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "ExclusiveLock"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ResourceType", Title: "ResourceType", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ResourceID", Title: "ResourceID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "UserName", Title: "UserName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Workstation", Title: "Workstation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "LockStart", Title: "LockStart", Pipe: "msDate", DataType: DataTypeEnum.datetime, IsFilterEnabled: true },
        { Name: "LockFinish", Title: "LockFinish", Pipe: "msDate", DataType: DataTypeEnum.datetime, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonExclusiveLock) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ResourceType = modelData.ResourceType;
            this.ResourceID = modelData.ResourceID;
            this.UserName = modelData.UserName;
            this.Workstation = modelData.Workstation;
            this.LockStart = modelData.LockStart;
            this.LockFinish = modelData.LockFinish;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ResourceType":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "ResourceType is required" }
            ],
            "ResourceID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "ResourceID is required" }
            ],
            "UserName":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "UserName is required" }
            ],
            "Workstation":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Workstation is required" }
            ],
            "LockStart":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "LockStart is required" }
            ],
            "LockFinish":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "LockFinish is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSetLock extends BaseEntity implements BaseEntityWithFilters
{
    public ResourceType : string;
    public ResourceID : string;
    public ID : string;

    getNewInstance(): CommonSetLock { return new CommonSetLock(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SetLock"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ResourceType", Title: "ResourceType", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ResourceID", Title: "ResourceID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonSetLock) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ResourceType = modelData.ResourceType;
            this.ResourceID = modelData.ResourceID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ResourceType":[
            ],
            "ResourceID":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonReleaseLock extends BaseEntity implements BaseEntityWithFilters
{
    public ResourceType : string;
    public ResourceID : string;
    public ID : string;

    getNewInstance(): CommonReleaseLock { return new CommonReleaseLock(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "ReleaseLock"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ResourceType", Title: "ResourceType", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ResourceID", Title: "ResourceID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonReleaseLock) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ResourceType = modelData.ResourceType;
            this.ResourceID = modelData.ResourceID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ResourceType":[
            ],
            "ResourceID":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonLogReader extends BaseEntity implements BaseEntityWithFilters
{
    public Created : string;
    public Description : string;
    public ItemId : string;
    public TableName : string;
    public Action : string;
    public ContextInfo : string;
    public Workstation : string;
    public UserName : string;
    public ID : string;

    getNewInstance(): CommonLogReader { return new CommonLogReader(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "LogReader"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Created", Title: "Created", Pipe: "msDate", DataType: DataTypeEnum.datetime, IsFilterEnabled: true },
        { Name: "Description", Title: "Description", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Action", Title: "Action", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ContextInfo", Title: "ContextInfo", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Workstation", Title: "Workstation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "UserName", Title: "UserName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonLogReader) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Created = modelData.Created;
            this.Description = modelData.Description;
            this.ItemId = modelData.ItemId;
            this.TableName = modelData.TableName;
            this.Action = modelData.Action;
            this.ContextInfo = modelData.ContextInfo;
            this.Workstation = modelData.Workstation;
            this.UserName = modelData.UserName;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Created":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Created is required" }
            ],
            "Description":[
            ],
            "ItemId":[
            ],
            "TableName":[
            ],
            "Action":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Action is required" }
            ],
            "ContextInfo":[
            ],
            "Workstation":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Workstation is required" }
            ],
            "UserName":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "UserName is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonLog extends BaseEntity implements BaseEntityWithFilters
{
    public Created : string;
    public UserName : string;
    public Workstation : string;
    public ContextInfo : string;
    public Action : string;
    public TableName : string;
    public ItemId : string;
    public Description : string;
    public ID : string;

    getNewInstance(): CommonLog { return new CommonLog(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "Log"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Created", Title: "Created", Pipe: "msDate", DataType: DataTypeEnum.datetime, IsFilterEnabled: true },
        { Name: "UserName", Title: "UserName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Workstation", Title: "Workstation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ContextInfo", Title: "ContextInfo", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Action", Title: "Action", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Description", Title: "Description", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonLog) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Created = modelData.Created;
            this.UserName = modelData.UserName;
            this.Workstation = modelData.Workstation;
            this.ContextInfo = modelData.ContextInfo;
            this.Action = modelData.Action;
            this.TableName = modelData.TableName;
            this.ItemId = modelData.ItemId;
            this.Description = modelData.Description;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Created":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Created is required" }
            ],
            "UserName":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "UserName is required" }
            ],
            "Workstation":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Workstation is required" }
            ],
            "ContextInfo":[
            ],
            "Action":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Action is required" }
            ],
            "TableName":[
            ],
            "ItemId":[
            ],
            "Description":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonLogRelatedItemReader extends BaseEntity implements BaseEntityWithFilters
{
    public ItemId : string;
    public LogID : string;
    public Relation : string;
    public TableName : string;
    public ID : string;

    getNewInstance(): CommonLogRelatedItemReader { return new CommonLogRelatedItemReader(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "LogRelatedItemReader"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "LogID", Title: "LogID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Relation", Title: "Relation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonLogRelatedItemReader) {
        if (modelData) {
            this.ID = modelData.ID;
            this.ItemId = modelData.ItemId;
            this.LogID = modelData.LogID;
            this.Relation = modelData.Relation;
            this.TableName = modelData.TableName;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "ItemId":[
            ],
            "LogID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Log is required" }
            ],
            "Relation":[
            ],
            "TableName":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonLogRelatedItem extends BaseEntity implements BaseEntityWithFilters
{
    public LogID : string;
    public TableName : string;
    public ItemId : string;
    public Relation : string;
    public ID : string;

    getNewInstance(): CommonLogRelatedItem { return new CommonLogRelatedItem(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "LogRelatedItem"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "LogID", Title: "LogID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Relation", Title: "Relation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonLogRelatedItem) {
        if (modelData) {
            this.ID = modelData.ID;
            this.LogID = modelData.LogID;
            this.TableName = modelData.TableName;
            this.ItemId = modelData.ItemId;
            this.Relation = modelData.Relation;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "LogID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Log is required" }
            ],
            "TableName":[
            ],
            "ItemId":[
            ],
            "Relation":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredLog ", filter: "Common.SystemRequiredLog", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredLog ", filter: "Common.SystemRequiredLog", isComposableFilter: true }
        ];
    }
}


export class CommonAddToLog extends BaseEntity implements BaseEntityWithFilters
{
    public Action : string;
    public TableName : string;
    public ItemId : string;
    public Description : string;
    public ID : string;

    getNewInstance(): CommonAddToLog { return new CommonAddToLog(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "AddToLog"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Action", Title: "Action", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Description", Title: "Description", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonAddToLog) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Action = modelData.Action;
            this.TableName = modelData.TableName;
            this.ItemId = modelData.ItemId;
            this.Description = modelData.Description;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Action":[
            ],
            "TableName":[
            ],
            "ItemId":[
            ],
            "Description":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonRelatedEventsSource extends BaseEntity implements BaseEntityWithFilters
{
    public LogID : string;
    public Relation : string;
    public RelatedToTable : string;
    public RelatedToItem : string;
    public Created : string;
    public Description : string;
    public ItemId : string;
    public TableName : string;
    public Action : string;
    public ContextInfo : string;
    public Workstation : string;
    public UserName : string;
    public ID : string;

    getNewInstance(): CommonRelatedEventsSource { return new CommonRelatedEventsSource(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "RelatedEventsSource"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "LogID", Title: "LogID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Relation", Title: "Relation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "RelatedToTable", Title: "RelatedToTable", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "RelatedToItem", Title: "RelatedToItem", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Created", Title: "Created", Pipe: "msDate", DataType: DataTypeEnum.datetime, IsFilterEnabled: true },
        { Name: "Description", Title: "Description", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ItemId", Title: "ItemId", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "TableName", Title: "TableName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Action", Title: "Action", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ContextInfo", Title: "ContextInfo", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "Workstation", Title: "Workstation", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "UserName", Title: "UserName", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonRelatedEventsSource) {
        if (modelData) {
            this.ID = modelData.ID;
            this.LogID = modelData.LogID;
            this.Relation = modelData.Relation;
            this.RelatedToTable = modelData.RelatedToTable;
            this.RelatedToItem = modelData.RelatedToItem;
            this.Created = modelData.Created;
            this.Description = modelData.Description;
            this.ItemId = modelData.ItemId;
            this.TableName = modelData.TableName;
            this.Action = modelData.Action;
            this.ContextInfo = modelData.ContextInfo;
            this.Workstation = modelData.Workstation;
            this.UserName = modelData.UserName;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "LogID":[
            ],
            "Relation":[
            ],
            "RelatedToTable":[
            ],
            "RelatedToItem":[
            ],
            "Created":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Created is required" }
            ],
            "Description":[
            ],
            "ItemId":[
            ],
            "TableName":[
            ],
            "Action":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Action is required" }
            ],
            "ContextInfo":[
            ],
            "Workstation":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Workstation is required" }
            ],
            "UserName":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "UserName is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonMyClaim extends BaseEntity implements BaseEntityWithFilters
{
    public Applies : boolean;
    public ID : string;

    getNewInstance(): CommonMyClaim { return new CommonMyClaim(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "MyClaim"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "Applies", Title: "Applies", Pipe: "", DataType: DataTypeEnum.boolean, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonMyClaim) {
        if (modelData) {
            this.ID = modelData.ID;
            this.Applies = modelData.Applies;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "Applies":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" Claim ", filter: "Common.Claim", isComposableFilter: false },
            { name:" Claim> ", filter: "IEnumerable<Common.Claim>", isComposableFilter: false }
        ];
    }
}


export class CommonRoleInheritsRole extends BaseEntity implements BaseEntityWithFilters
{
    public UsersFromID : string;
    public PermissionsFromID : string;
    public ID : string;

    getNewInstance(): CommonRoleInheritsRole { return new CommonRoleInheritsRole(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "RoleInheritsRole"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "UsersFromID", Title: "UsersFromID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "PermissionsFromID", Title: "PermissionsFromID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonRoleInheritsRole) {
        if (modelData) {
            this.ID = modelData.ID;
            this.UsersFromID = modelData.UsersFromID;
            this.PermissionsFromID = modelData.PermissionsFromID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "UsersFromID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "UsersFrom is required" }
            ],
            "PermissionsFromID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "PermissionsFrom is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredUsersFrom ", filter: "Common.SystemRequiredUsersFrom", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredUsersFrom ", filter: "Common.SystemRequiredUsersFrom", isComposableFilter: true }
        ];
    }
}


export class CommonPrincipalPermission extends BaseEntity implements BaseEntityWithFilters
{
    public PrincipalID : string;
    public ClaimID : string;
    public IsAuthorized : boolean;
    public ID : string;

    getNewInstance(): CommonPrincipalPermission { return new CommonPrincipalPermission(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "PrincipalPermission"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "PrincipalID", Title: "PrincipalID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ClaimID", Title: "ClaimID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "IsAuthorized", Title: "IsAuthorized", Pipe: "", DataType: DataTypeEnum.boolean, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonPrincipalPermission) {
        if (modelData) {
            this.ID = modelData.ID;
            this.PrincipalID = modelData.PrincipalID;
            this.ClaimID = modelData.ClaimID;
            this.IsAuthorized = modelData.IsAuthorized;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "PrincipalID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Principal is required" }
            ],
            "ClaimID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Claim is required" }
            ],
            "IsAuthorized":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "IsAuthorized is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredPrincipal ", filter: "Common.SystemRequiredPrincipal", message: "System required property {0} is not set." },
            { name:" SystemRequiredClaim ", filter: "Common.SystemRequiredClaim", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredPrincipal ", filter: "Common.SystemRequiredPrincipal", isComposableFilter: true },
            { name:" SystemRequiredClaim ", filter: "Common.SystemRequiredClaim", isComposableFilter: true }
        ];
    }
}


export class CommonRolePermission extends BaseEntity implements BaseEntityWithFilters
{
    public RoleID : string;
    public ClaimID : string;
    public IsAuthorized : boolean;
    public ID : string;

    getNewInstance(): CommonRolePermission { return new CommonRolePermission(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "RolePermission"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "RoleID", Title: "RoleID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ClaimID", Title: "ClaimID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "IsAuthorized", Title: "IsAuthorized", Pipe: "", DataType: DataTypeEnum.boolean, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonRolePermission) {
        if (modelData) {
            this.ID = modelData.ID;
            this.RoleID = modelData.RoleID;
            this.ClaimID = modelData.ClaimID;
            this.IsAuthorized = modelData.IsAuthorized;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "RoleID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Role is required" }
            ],
            "ClaimID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Claim is required" }
            ],
            "IsAuthorized":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "IsAuthorized is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredRole ", filter: "Common.SystemRequiredRole", message: "System required property {0} is not set." },
            { name:" SystemRequiredClaim ", filter: "Common.SystemRequiredClaim", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredRole ", filter: "Common.SystemRequiredRole", isComposableFilter: true },
            { name:" SystemRequiredClaim ", filter: "Common.SystemRequiredClaim", isComposableFilter: true }
        ];
    }
}


export class CommonRowPermissionsReadItems extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonRowPermissionsReadItems { return new CommonRowPermissionsReadItems(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "RowPermissionsReadItems"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonRowPermissionsReadItems) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonRowPermissionsWriteItems extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonRowPermissionsWriteItems { return new CommonRowPermissionsWriteItems(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "RowPermissionsWriteItems"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonRowPermissionsWriteItems) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonPermission extends BaseEntity implements BaseEntityWithFilters
{
    public RoleID : string;
    public ClaimID : string;
    public IsAuthorized : boolean;
    public ID : string;

    getNewInstance(): CommonPermission { return new CommonPermission(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "Permission"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "RoleID", Title: "RoleID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "ClaimID", Title: "ClaimID", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "IsAuthorized", Title: "IsAuthorized", Pipe: "", DataType: DataTypeEnum.boolean, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonPermission) {
        if (modelData) {
            this.ID = modelData.ID;
            this.RoleID = modelData.RoleID;
            this.ClaimID = modelData.ClaimID;
            this.IsAuthorized = modelData.IsAuthorized;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "RoleID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Role is required" }
            ],
            "ClaimID":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "Claim is required" }
            ],
            "IsAuthorized":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "IsAuthorized is required" }
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonAspNetFormsAuthPasswordAttemptsLimit extends BaseEntity implements BaseEntityWithFilters
{
    public MaxInvalidPasswordAttempts : number;
    public TimeoutInSeconds : number;
    public ID : string;

    getNewInstance(): CommonAspNetFormsAuthPasswordAttemptsLimit { return new CommonAspNetFormsAuthPasswordAttemptsLimit(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "AspNetFormsAuthPasswordAttemptsLimit"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "MaxInvalidPasswordAttempts", Title: "MaxInvalidPasswordAttempts", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true },
        { Name: "TimeoutInSeconds", Title: "TimeoutInSeconds", Pipe: "", DataType: DataTypeEnum.number, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonAspNetFormsAuthPasswordAttemptsLimit) {
        if (modelData) {
            this.ID = modelData.ID;
            this.MaxInvalidPasswordAttempts = modelData.MaxInvalidPasswordAttempts;
            this.TimeoutInSeconds = modelData.TimeoutInSeconds;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "MaxInvalidPasswordAttempts":[
                {Validator :Validators.required, ErrorCode: 'required', ErrorMessage: "MaxInvalidPasswordAttempts is required" }
            ],
            "TimeoutInSeconds":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
            { name:" SystemRequiredMaxInvalidPasswordAttempts ", filter: "Common.SystemRequiredMaxInvalidPasswordAttempts", message: "System required property {0} is not set." }
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
            { name:" SystemRequiredMaxInvalidPasswordAttempts ", filter: "Common.SystemRequiredMaxInvalidPasswordAttempts", isComposableFilter: true }
        ];
    }
}


export class CommonAspNetFormsAuthPasswordStrength extends BaseEntity implements BaseEntityWithFilters
{
    public RegularExpression : string;
    public RuleDescription : string;
    public ID : string;

    getNewInstance(): CommonAspNetFormsAuthPasswordStrength { return new CommonAspNetFormsAuthPasswordStrength(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "AspNetFormsAuthPasswordStrength"; }
    
    public browseFields: Array<IFieldDefinition> = [
        { Name: "RegularExpression", Title: "RegularExpression", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true },
        { Name: "RuleDescription", Title: "RuleDescription", Pipe: "", DataType: DataTypeEnum.string, IsFilterEnabled: true }
    ];

    public setModelData(modelData: CommonAspNetFormsAuthPasswordStrength) {
        if (modelData) {
            this.ID = modelData.ID;
            this.RegularExpression = modelData.RegularExpression;
            this.RuleDescription = modelData.RuleDescription;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
            "RegularExpression":[
            ],
            "RuleDescription":[
            ]
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolAge_MaxValueFilter extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolAge_MaxValueFilter { return new SchoolAge_MaxValueFilter(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Age_MaxValueFilter"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolAge_MaxValueFilter) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolAge_MinValueFilter extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolAge_MinValueFilter { return new SchoolAge_MinValueFilter(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Age_MinValueFilter"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolAge_MinValueFilter) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolMSSV_RegExMatchFilter extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolMSSV_RegExMatchFilter { return new SchoolMSSV_RegExMatchFilter(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "MSSV_RegExMatchFilter"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolMSSV_RegExMatchFilter) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolCheckAge2 extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolCheckAge2 { return new SchoolCheckAge2(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "CheckAge2"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolCheckAge2) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolCheckAge extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolCheckAge { return new SchoolCheckAge(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "CheckAge"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolCheckAge) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolName_MaxLengthFilter extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolName_MaxLengthFilter { return new SchoolName_MaxLengthFilter(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Name_MaxLengthFilter"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolName_MaxLengthFilter) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class SchoolName_MinLengthFilter extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): SchoolName_MinLengthFilter { return new SchoolName_MinLengthFilter(); }
    getModuleName(): string { return "School"; }
    getEntityName(): string { return "Name_MinLengthFilter"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: SchoolName_MinLengthFilter) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredAspNetUserId extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredAspNetUserId { return new CommonSystemRequiredAspNetUserId(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredAspNetUserId"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredAspNetUserId) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredMaxInvalidPasswordAttempts extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredMaxInvalidPasswordAttempts { return new CommonSystemRequiredMaxInvalidPasswordAttempts(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredMaxInvalidPasswordAttempts"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredMaxInvalidPasswordAttempts) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredActive extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredActive { return new CommonSystemRequiredActive(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredActive"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredActive) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredLog extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredLog { return new CommonSystemRequiredLog(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredLog"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredLog) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredPrincipal extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredPrincipal { return new CommonSystemRequiredPrincipal(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredPrincipal"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredPrincipal) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredUsersFrom extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredUsersFrom { return new CommonSystemRequiredUsersFrom(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredUsersFrom"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredUsersFrom) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredClaim extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredClaim { return new CommonSystemRequiredClaim(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredClaim"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredClaim) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


export class CommonSystemRequiredRole extends BaseEntity implements BaseEntityWithFilters
{
    public ID : string;

    getNewInstance(): CommonSystemRequiredRole { return new CommonSystemRequiredRole(); }
    getModuleName(): string { return "Common"; }
    getEntityName(): string { return "SystemRequiredRole"; }
    
    public browseFields: Array<IFieldDefinition> = [
    ];

    public setModelData(modelData: CommonSystemRequiredRole) {
        if (modelData) {
            this.ID = modelData.ID;
        }
    }
    
    getValidators(): { [propName: string]: ValidatorDefinition[]; } {
        return { 
        };
    }

    getInvalidDataDefinitions():Array<any> {
        return [
        ];
    }

    getFilterDefinitions():Array<any> {
        return [
        ];
    }
}


@AppEntityProvider({ ID: 'Common.GetClaims', EntityType: CommonGetClaims })

@AppEntityProvider({ ID: 'Common.Claim', EntityType: CommonClaim })

@AppEntityProvider({ ID: 'Common.MyAccount', EntityType: CommonMyAccount })

@AppEntityProvider({ ID: 'Common.Principal', EntityType: CommonPrincipal })

@AppEntityProvider({ ID: 'Common.GetUserInfo', EntityType: CommonGetUserInfo })

@AppEntityProvider({ ID: 'Common.PrincipalHasRole', EntityType: CommonPrincipalHasRole })

@AppEntityProvider({ ID: 'Common.Role', EntityType: CommonRole })

@AppEntityProvider({ ID: 'Common.CurrentUser', EntityType: CommonCurrentUser })

@AppEntityProvider({ ID: 'School.Student', EntityType: SchoolStudent })

@AppEntityProvider({ ID: 'School.Teacher', EntityType: SchoolTeacher })

@AppEntityProvider({ ID: 'School.XXX', EntityType: SchoolXXX })

@AppEntityProvider({ ID: 'School.FilterByPrefix', EntityType: SchoolFilterByPrefix })

@AppEntityProvider({ ID: 'School.ComposableFilterByContains', EntityType: SchoolComposableFilterByContains })

@AppEntityProvider({ ID: 'Common.AutoCodeCache', EntityType: CommonAutoCodeCache })

@AppEntityProvider({ ID: 'Common.FilterId', EntityType: CommonFilterId })

@AppEntityProvider({ ID: 'Common.KeepSynchronizedMetadata', EntityType: CommonKeepSynchronizedMetadata })

@AppEntityProvider({ ID: 'Common.ExclusiveLock', EntityType: CommonExclusiveLock })

@AppEntityProvider({ ID: 'Common.SetLock', EntityType: CommonSetLock })

@AppEntityProvider({ ID: 'Common.ReleaseLock', EntityType: CommonReleaseLock })

@AppEntityProvider({ ID: 'Common.LogReader', EntityType: CommonLogReader })

@AppEntityProvider({ ID: 'Common.Log', EntityType: CommonLog })

@AppEntityProvider({ ID: 'Common.LogRelatedItemReader', EntityType: CommonLogRelatedItemReader })

@AppEntityProvider({ ID: 'Common.LogRelatedItem', EntityType: CommonLogRelatedItem })

@AppEntityProvider({ ID: 'Common.AddToLog', EntityType: CommonAddToLog })

@AppEntityProvider({ ID: 'Common.RelatedEventsSource', EntityType: CommonRelatedEventsSource })

@AppEntityProvider({ ID: 'Common.MyClaim', EntityType: CommonMyClaim })

@AppEntityProvider({ ID: 'Common.RoleInheritsRole', EntityType: CommonRoleInheritsRole })

@AppEntityProvider({ ID: 'Common.PrincipalPermission', EntityType: CommonPrincipalPermission })

@AppEntityProvider({ ID: 'Common.RolePermission', EntityType: CommonRolePermission })

@AppEntityProvider({ ID: 'Common.RowPermissionsReadItems', EntityType: CommonRowPermissionsReadItems })

@AppEntityProvider({ ID: 'Common.RowPermissionsWriteItems', EntityType: CommonRowPermissionsWriteItems })

@AppEntityProvider({ ID: 'Common.Permission', EntityType: CommonPermission })

@AppEntityProvider({ ID: 'Common.AspNetFormsAuthPasswordAttemptsLimit', EntityType: CommonAspNetFormsAuthPasswordAttemptsLimit })

@AppEntityProvider({ ID: 'Common.AspNetFormsAuthPasswordStrength', EntityType: CommonAspNetFormsAuthPasswordStrength })

@AppEntityProvider({ ID: 'School.Age_MaxValueFilter', EntityType: SchoolAge_MaxValueFilter })

@AppEntityProvider({ ID: 'School.Age_MinValueFilter', EntityType: SchoolAge_MinValueFilter })

@AppEntityProvider({ ID: 'School.MSSV_RegExMatchFilter', EntityType: SchoolMSSV_RegExMatchFilter })

@AppEntityProvider({ ID: 'School.CheckAge2', EntityType: SchoolCheckAge2 })

@AppEntityProvider({ ID: 'School.CheckAge', EntityType: SchoolCheckAge })

@AppEntityProvider({ ID: 'School.Name_MaxLengthFilter', EntityType: SchoolName_MaxLengthFilter })

@AppEntityProvider({ ID: 'School.Name_MinLengthFilter', EntityType: SchoolName_MinLengthFilter })

@AppEntityProvider({ ID: 'Common.SystemRequiredAspNetUserId', EntityType: CommonSystemRequiredAspNetUserId })

@AppEntityProvider({ ID: 'Common.SystemRequiredMaxInvalidPasswordAttempts', EntityType: CommonSystemRequiredMaxInvalidPasswordAttempts })

@AppEntityProvider({ ID: 'Common.SystemRequiredActive', EntityType: CommonSystemRequiredActive })

@AppEntityProvider({ ID: 'Common.SystemRequiredLog', EntityType: CommonSystemRequiredLog })

@AppEntityProvider({ ID: 'Common.SystemRequiredPrincipal', EntityType: CommonSystemRequiredPrincipal })

@AppEntityProvider({ ID: 'Common.SystemRequiredUsersFrom', EntityType: CommonSystemRequiredUsersFrom })

@AppEntityProvider({ ID: 'Common.SystemRequiredClaim', EntityType: CommonSystemRequiredClaim })

@AppEntityProvider({ ID: 'Common.SystemRequiredRole', EntityType: CommonSystemRequiredRole })

@Injectable()
export class AllModels{}
@AppMenuItem(
    {
        Name: "Tables",
        Link: "",
        Icon: "fa fa-table",
        Tooltip: "",
        Children:
        [
            
            {
                Name: "Common",
                Link: "",
                Icon: "fa fa-square-o",
                Tooltip: "",
                Parent: "Tables",
                Children:
                [
                    
                {
                    Name: "Common GetClaims",
                    Link: "generic-grid/Common.GetClaims",
                    Tooltip: "CommonGetClaims",
                    ClaimResource: "Common.GetClaims",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common Claim",
                    Link: "generic-grid/Common.Claim",
                    Tooltip: "CommonClaim",
                    ClaimResource: "Common.Claim",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common Principal",
                    Link: "generic-grid/Common.Principal",
                    Tooltip: "CommonPrincipal",
                    ClaimResource: "Common.Principal",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common GetUserInfo",
                    Link: "generic-grid/Common.GetUserInfo",
                    Tooltip: "CommonGetUserInfo",
                    ClaimResource: "Common.GetUserInfo",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common PrincipalHasRole",
                    Link: "generic-grid/Common.PrincipalHasRole",
                    Tooltip: "CommonPrincipalHasRole",
                    ClaimResource: "Common.PrincipalHasRole",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common Role",
                    Link: "generic-grid/Common.Role",
                    Tooltip: "CommonRole",
                    ClaimResource: "Common.Role",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common AutoCodeCache",
                    Link: "generic-grid/Common.AutoCodeCache",
                    Tooltip: "CommonAutoCodeCache",
                    ClaimResource: "Common.AutoCodeCache",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common FilterId",
                    Link: "generic-grid/Common.FilterId",
                    Tooltip: "CommonFilterId",
                    ClaimResource: "Common.FilterId",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common KeepSynchronizedMetadata",
                    Link: "generic-grid/Common.KeepSynchronizedMetadata",
                    Tooltip: "CommonKeepSynchronizedMetadata",
                    ClaimResource: "Common.KeepSynchronizedMetadata",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common ExclusiveLock",
                    Link: "generic-grid/Common.ExclusiveLock",
                    Tooltip: "CommonExclusiveLock",
                    ClaimResource: "Common.ExclusiveLock",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common LogReader",
                    Link: "generic-grid/Common.LogReader",
                    Tooltip: "CommonLogReader",
                    ClaimResource: "Common.LogReader",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common Log",
                    Link: "generic-grid/Common.Log",
                    Tooltip: "CommonLog",
                    ClaimResource: "Common.Log",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common LogRelatedItemReader",
                    Link: "generic-grid/Common.LogRelatedItemReader",
                    Tooltip: "CommonLogRelatedItemReader",
                    ClaimResource: "Common.LogRelatedItemReader",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common LogRelatedItem",
                    Link: "generic-grid/Common.LogRelatedItem",
                    Tooltip: "CommonLogRelatedItem",
                    ClaimResource: "Common.LogRelatedItem",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common RelatedEventsSource",
                    Link: "generic-grid/Common.RelatedEventsSource",
                    Tooltip: "CommonRelatedEventsSource",
                    ClaimResource: "Common.RelatedEventsSource",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common MyClaim",
                    Link: "generic-grid/Common.MyClaim",
                    Tooltip: "CommonMyClaim",
                    ClaimResource: "Common.MyClaim",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common RoleInheritsRole",
                    Link: "generic-grid/Common.RoleInheritsRole",
                    Tooltip: "CommonRoleInheritsRole",
                    ClaimResource: "Common.RoleInheritsRole",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common PrincipalPermission",
                    Link: "generic-grid/Common.PrincipalPermission",
                    Tooltip: "CommonPrincipalPermission",
                    ClaimResource: "Common.PrincipalPermission",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common RolePermission",
                    Link: "generic-grid/Common.RolePermission",
                    Tooltip: "CommonRolePermission",
                    ClaimResource: "Common.RolePermission",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common Permission",
                    Link: "generic-grid/Common.Permission",
                    Tooltip: "CommonPermission",
                    ClaimResource: "Common.Permission",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common AspNetFormsAuthPasswordAttemptsLimit",
                    Link: "generic-grid/Common.AspNetFormsAuthPasswordAttemptsLimit",
                    Tooltip: "CommonAspNetFormsAuthPasswordAttemptsLimit",
                    ClaimResource: "Common.AspNetFormsAuthPasswordAttemptsLimit",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "Common AspNetFormsAuthPasswordStrength",
                    Link: "generic-grid/Common.AspNetFormsAuthPasswordStrength",
                    Tooltip: "CommonAspNetFormsAuthPasswordStrength",
                    ClaimResource: "Common.AspNetFormsAuthPasswordStrength",
                    Parent: "Common",
                    ClaimRight: "Read",
                    Children: []
                }
                ]
            },

            {
                Name: "School",
                Link: "",
                Icon: "fa fa-square-o",
                Tooltip: "",
                Parent: "Tables",
                Children:
                [
                    
                {
                    Name: "School Student",
                    Link: "generic-grid/School.Student",
                    Tooltip: "SchoolStudent",
                    ClaimResource: "School.Student",
                    Parent: "School",
                    ClaimRight: "Read",
                    Children: []
                },

                {
                    Name: "School Teacher",
                    Link: "generic-grid/School.Teacher",
                    Tooltip: "SchoolTeacher",
                    ClaimResource: "School.Teacher",
                    Parent: "School",
                    ClaimRight: "Read",
                    Children: []
                }
                ]
            }
        ]
    })

@Injectable()
export class AllMenuItemModels{}