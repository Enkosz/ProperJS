import { Provider } from "../../common/type/provider";
import hash from "object-hash";
import MetaType from "../../common/type/meta-type";
import {Controller} from "../../common/type/controller";

export default class WebApplicationContainer {
    private readonly controllers: Map<Object, MetaType<Controller>>
    private readonly providers: Map<String, MetaType<Provider>>

    constructor() {
        this.controllers = new Map<Object, MetaType<Controller>>();
        this.providers = new Map<String, MetaType<Provider>>();
    }

    public getProviders() {
        return this.providers;
    }

    public getProvider(provider: any) {
        const hashed = hash(provider);

        return this.providers.get(hashed);
    }

    public getProviderByToken(token: String) {
        return this.providers.get(token);
    }

    public addProvider(provider: any) {
        const hashed = hash(provider);

        if(!this.providers.has(hashed))
            this.providers.set(hashed, new MetaType<Provider>(provider))
    }

    public getControllers() {
        return this.controllers;
    }

    public addController(controller: any) {
        const hashed = hash(controller);

        if(!this.controllers.has(hashed))
            this.controllers.set(controller, new MetaType<Controller>(controller))
    }
}

