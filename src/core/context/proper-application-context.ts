import ApplicationContext from "./application-context";
import Injector from "@core/injector/injector";
import {InstanceLoader} from "@core/loader/instance-loader";
import ComponentScanner from "@core/scanner/component-scanner";
import DirectoryComponentScanner from "@core/scanner/strategy/directory-component-scanner";
import {ApplicationContainer} from "@core/container/application-container";

export default class ProperApplicationContext implements ApplicationContext {

    protected readonly container: ApplicationContainer;
    protected readonly loader: InstanceLoader;
    protected readonly scanner: ComponentScanner
    protected readonly injector: Injector;

    protected initialized: Boolean

    constructor() {
        this.container = new ApplicationContainer();
        this.scanner = new DirectoryComponentScanner();
        this.loader = new InstanceLoader(this.container, this.scanner);
        this.injector = new Injector(this.container);

        this.initialized = false;
    }

    get<T>(token: String | any): T {
        let metaType;

        if(token instanceof String)
            metaType = this.container.getProviderByToken(token);
        else
            metaType = this.container.getProvider(token)

        // @ts-ignore
        return metaType ? metaType.instance : undefined!;
    }

    public async init() {
        if(this.initialized)
            return this;

        await this.loader.load();
        await this.injector.inject();

        this.initialized = true;
        return this;
    }
}
