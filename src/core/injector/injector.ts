import Logger from "@utils/logger"
import MetaType from "@common/type/meta-type";
import {Provider} from "@common/type/provider";
import {ApplicationContainer} from "@core/container/application-container";
import DependencyDiscover from "@core/discovery/dependency-discover";

export default class Injector {

    private readonly logger: Logger = new Logger(this.constructor.name)
    private readonly container: ApplicationContainer
    private readonly discover: DependencyDiscover;

    constructor(container: ApplicationContainer) {
        this.container = container;
        this.discover = new DependencyDiscover(this.container);
    }

    public inject() {
        this.discover.discoverDependencies();
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
        this.logger.log("Resolving component", metaType.reference)
        if (metaType.instance != null)
            return;

        let args: any[] = [];
        const dependencies = metaType.dependencies;

        dependencies.forEach((dependency) => {
            const dependencyMetaType = this.container.getProvider(dependency.reference);

            if (dependencyMetaType === undefined)
                throw new Error(`Unregistered component type: ${dependencyMetaType}`);

            this.logger.log("Resolving dependency", dependencyMetaType.reference)
            if (dependencyMetaType.instance == null)
                this.injectComponent(dependencyMetaType);

            args.push(dependencyMetaType.instance);
        })

        metaType.instance = new metaType.reference(...args)
    }
}
