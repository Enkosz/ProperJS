import ApplicationContext from "./application-context";
import {Provider} from "@common/type/provider";
import WebApplicationContainer from "../container/web-application-container";
import Injector from "../injector/injector";
import {InstanceLoader} from "../loader/instance-loader";
import ComponentScanner from "@core/scanner/component-scanner";
import DirectoryComponentScanner from "@core/scanner/strategy/directory-component-scanner";
import DependencyDiscover from "@core/discovery/dependency-discover";

export default class ProperApplicationContext implements ApplicationContext {

    protected readonly container: WebApplicationContainer;
    protected readonly loader: InstanceLoader;
    protected readonly scanner: ComponentScanner
    protected readonly injector: Injector;
    protected readonly discover: DependencyDiscover;

    private initialized: Boolean

    constructor() {
        this.container = new WebApplicationContainer();
        this.scanner = new DirectoryComponentScanner();
        this.loader = new InstanceLoader(this.container, this.scanner);
        this.discover = new DependencyDiscover(this.container);
        this.injector = new Injector(this.container);

        this.initialized = false;
    }

    get(token: String): Provider {
        const metaType = this.container.getProviderByToken(token);

        return metaType ? metaType.instance : undefined!;
    }

    public async init() {
        if(this.initialized)
            return this;

        await this.scanner.scanComponents();
        await this.loader.load();
        await this.discover.discoverDependencies();
        await this.injector.inject();

        this.initialized = true;
        return this;
    }
}
