import {Provider} from "./provider";
import {Type} from "@common/type/type";

export default class MetaType<T extends Type> {

    private _instance: T;
    private readonly _dependencies: Set<MetaType<Provider>>
    private readonly _reference: Type<T>

    constructor(reference: any) {
        this._reference = reference;
        this._instance = null!;
        this._dependencies = new Set<MetaType<Provider>>();
    }

    get instance(): T {
        return this._instance;
    }

    get dependencies(): Set<MetaType<Type>> {
        return this._dependencies;
    }

    get reference(): any {
        return this._reference;
    }

    set instance(value: T) {
        this._instance = value;
    }
}
