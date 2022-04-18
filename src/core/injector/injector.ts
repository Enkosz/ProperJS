import WebApplicationContainer from "../container/web-application-container";
import Logger from "../../utils/logger"
import MetaType from "@common/type/meta-type";
import {Provider} from "@common/type/provider";

export default class Injector {

    private readonly logger: Logger = new Logger(this.constructor.name)
    private readonly container: WebApplicationContainer

    constructor(container: WebApplicationContainer) {
        this.container = container;
    }

    public inject() {
        this.injectComponents();
        this.injectControllers();
    }

    private injectComponents() {
        this.logger.log("Injecting components...")
        const providers = this.container.getProviders();

        providers.forEach((metaType) => this.injectComponent(metaType))
    }

    private injectControllers() {
        this.logger.log("Injecting controllers...")
        const controllers = this.container.getControllers();

        controllers.forEach((metaType) => this.injectComponent(metaType))
    }

    private injectComponent(metaType: MetaType<Provider>) {
        if (metaType.instance != null)
            return;

        let args: any[] = [];
        const dependencies = metaType.dependencies;

        dependencies.forEach((dependency) => {
            const dependencyMetaType = this.container.getProvider(dependency);

            if (dependencyMetaType === undefined)
                throw new Error(`Unregistered component type: ${dependencyMetaType}`);

            if (dependencyMetaType.instance == null)
                this.injectComponent(dependencyMetaType);

            args.push(dependencyMetaType.instance);
        })

        metaType.instance = new metaType.reference(...args)
    }
}
