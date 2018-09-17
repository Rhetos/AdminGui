import { EntityClassProvider } from './entity-class.provider';
import { DecoratorRegistrations } from 'basecode/core';

export interface IEntityProvider {
    ID: string;
    EntityType?: any;
}

export class EntityProvider {
    ID: string;
    EntityType: any = null;
    constructor(params: IEntityProvider) {
        if (params) {
            this.setModelData(params);
            EntityClassProvider.mapEntity.add(params);
        }
    }

    public setModelData(params: IEntityProvider) {
        if (params) {
            this.ID = params.ID;
            this.EntityType = params.EntityType;
        }
    }
}

export function AppEntityProvider(params: IEntityProvider) {
    return function (classDef: any) {
        if (!params.EntityType) params.EntityType = classDef;
        let EP: EntityProvider = new EntityProvider(params);
        DecoratorRegistrations.registeredDecorators.push(EP);
    }
}

export interface BaseEntityWithFilters {
    getInvalidDataDefinitions(): Array<IInvalidDataFilter>;
    getFilterDefinitions(): Array<IFilterDefinition>;
}

export interface IInvalidDataFilter {
    name: string;
    filter: string;
    message?: string;
}

export interface IFilterDefinition  {
    name: string;
    filter: string;
    isComposableFilter: boolean;
}

export interface IInvalidChunk {
    ID: string;
    startID: string;
    endID: string;
    numRecord: number;
    numInvalid: number;
}

export interface IInvalidFilter {
    ID: string;
    filterName: string;
    listInvalidChunk: Array<IInvalidChunk>;
}

export interface IInvalidEntity
{
    ID: string;
    entityName: string;
    numRecord: number;
    listInvalidFilter: Array<IInvalidFilter>;
}