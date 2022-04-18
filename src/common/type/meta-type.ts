import {Provider} from "./provider";

export default class MetaType<T extends Provider> {

    private _instance: T;
    private readonly _dependencies: Set<MetaType<Provider>>
    private readonly _reference: any

    constructor(reference: any) {
        this._reference = reference;
        this._instance = null!;
        this._dependencies = new Set<MetaType<Provider>>();
    }

    get instance(): T {
        return this._instance;
    }

    get dependencies(): Set<MetaType<Provider>> {
        return this._dependencies;
    }

    get reference(): any {
        return this._reference;
    }

    set instance(value: T) {
        this._instance = value;
    }
}
