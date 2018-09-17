import { IEntityProvider } from './admingui-interface';
export class Dictionary {
    private items: Array<IEntityProvider> = new Array<IEntityProvider>();

    add(value: IEntityProvider) {
        this.items.push(value);
    }

    getByID(ID: string) {
        return this.items.find(x => x.ID === ID).EntityType;
    }
}