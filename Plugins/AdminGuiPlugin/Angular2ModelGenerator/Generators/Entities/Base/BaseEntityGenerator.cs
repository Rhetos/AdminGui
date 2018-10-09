using Angular2ModelGenerator.Constants;
using Angular2ModelGenerator.Enums;
using Angular2ModelGenerator.Generators.Entities.Interfaces;
using Angular2ModelGenerator.Helpers;
using Angular2ModelGenerator.Models;
using Angular2ModelGenerator.Templates;
using Rhetos.Compiler;
using Rhetos.Dsl;
using System;
using System.Collections.Generic;

namespace Angular2ModelGenerator.Generators.Entities.Base
{
    public abstract class BaseEntityGenerator<T> : IEntityGenerator where T : IConceptInfo
    {
        public virtual void GenerateCode(IConceptInfo conceptInfo, ICodeBuilder codeBuilder)
        {
            if (conceptInfo is T info)
            {
                // Added as entityProvider only that its Model can be used for form creating.
                AdditionCodes.Instance.AppEntityProviders.Add(new KeyValuePair<string, string>(GetModuleName(info), GetEntityName(info)));

                var menuItems = GenerateAppMenuItems(info);

                if (menuItems.Value != null)
                {
                    AdditionCodes.Instance.AppMenuItems.AddOrUpdate(menuItems.Key, menuItems.Value);
                }

                codeBuilder.InsertCode(GenerateCode(info));
            }
        }

        protected virtual string GenerateCode(T info)
        {
            return EntityTemplates.Entity(
                    GetClassName(info),
                    GetModuleName(info),
                    GetEntityName(info),
                    GenerateProperties(info),
                    GenerateFields(info),
                    GenerateSetMethods(info),
                    GenerateGetMethods(info));
        }

        protected virtual string GenerateProperties(T info)
        {
            return CsTagsManager.Instance.Get<T>(CsTagNames.Properties).Evaluate(info);
        }

        protected virtual string GenerateFields(T info)
        {
            return EntityTemplates.Fields.Browse(CsTagsManager.Instance.Get<T>(CsTagNames.BrowseFields).Evaluate(info));
        }

        protected virtual string GenerateSetMethods(T info)
        {
            return EntityTemplates.SetMethods.ModelData(GetClassName(info), CsTagsManager.Instance.Get<T>(CsTagNames.SetModelData).Evaluate(info));
        }

        protected virtual string GenerateGetMethods(T info)
        {
            return string.Join(
                Environment.NewLine + StringHelper.Spaces(4),
                EntityTemplates.GetMethods.Validators(CsTagsManager.Instance.Get<T>(CsTagNames.Validators).Evaluate(info)),
                EntityTemplates.GetMethods.InvalidDataDefinitions(CsTagsManager.Instance.Get<T>(CsTagNames.InvalidData).Evaluate(info)),
                EntityTemplates.GetMethods.FilterDefinitions(CsTagsManager.Instance.Get<T>(CsTagNames.Filters).Evaluate(info))
            );
        }

        protected abstract KeyValuePair<MenuItemType, AppMenuItem> GenerateAppMenuItems(T info);

        protected abstract string GetClassName(T info);

        protected abstract string GetModuleName(T info);

        protected abstract string GetEntityName(T info);
    }
}