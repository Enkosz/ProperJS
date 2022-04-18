import MetaType from "@common/type/meta-type";
import {Provider} from "@common/type/provider";
import hashObject from "object-hash";
import {Controller} from "@common/type/controller";

export class ApplicationContainer {
    protected readonly providers: Map<String, MetaType<Provider>>
    protected readonly controllers: Map<String, MetaType<Controller>>

    constructor() {
        this.providers = new Map<String, MetaType<Provider>>();
        this.controllers = new Map<String, MetaType<Controller>>();
    }

    public getProviders() {
        return this.providers;
    }

    public getProvider(provider: any) {
        const hashed = this.hash(provider);

        return this.providers.get(hashed);
    }

    public getProviderByToken(token: String) {
        return this.providers.get(token);
    }

    public addProvider(provider: any) {
        const hashed = this.hash(provider);

        if(!this.providers.has(hashed))
            this.providers.set(hashed, new MetaType<Provider>(provider))
    }

    public getControllers() {
        return this.controllers;
    }

    public addController(controller: any) {
        const hashed = this.hash(controller);

        if(!this.controllers.has(hashed))
            this.controllers.set(hashed, new MetaType<Controller>(controller))
    }

    protected hash(provider: any) {
        return hashObject(provider);
    }
}
