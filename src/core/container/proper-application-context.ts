import ApplicationContext from "./application-context";
import {Provider} from "../../common/type/provider";
import WebApplicationContainer from "./web-application-container";
import Injector from "../injector/injector";
import {InstanceLoader} from "../loader/instance-loader";

export default class ProperApplicationContext implements ApplicationContext {

    private readonly container: WebApplicationContainer;
    private readonly scanner: InstanceLoader;
    private readonly injector: Injector;

    constructor() {
        this.container = new WebApplicationContainer();
        this.scanner = new InstanceLoader(this.container);
        this.injector = new Injector(this.container);

        this.init();
    }

    get(token: String): Provider {
        const metaType = this.container.getProviderByToken(token);

        return metaType ? metaType.instance : undefined!;
    }

    private async init() {
        await this.scanner.load();
        await this.injector.inject();
    }
}
