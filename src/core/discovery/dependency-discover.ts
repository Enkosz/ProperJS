import MetaType from "@common/type/meta-type";
import {Reflector} from "@utils/reflector";
import {ApplicationContainer} from "@core/container/application-container";
import {Type} from "@common/type/type";

export default class DependencyDiscover {

    private readonly container: ApplicationContainer

    constructor(container: ApplicationContainer) {
        this.container = container;
    }

    public discoverDependencies() {
        this.discoverProvidersDependencies();
        this.discoverControllersDependencies();
    }

    private discoverProvidersDependencies() {
        this.container.getProviders()
            .forEach((metaType) => this.exploreDependencyFromMetaType(metaType))
    }

    private discoverControllersDependencies() {
        this.container.getControllers()
            .forEach((metaType) => this.exploreDependencyFromMetaType(metaType))
    }

    private exploreDependencyFromMetaType(metaType: MetaType<any>) {
        let constructorParameters = Reflector.getMetadata<Type[]>(metaType.reference, "design:paramtypes");

        // We could have default constructor with no parameters
        if(!constructorParameters)
            return;

        constructorParameters
            .forEach((parameter: Type) => {
                const component = this.container.getProvider(parameter);

                if(component == undefined)
                    throw new Error("Unknown component type")

                metaType.dependencies.add(component)
            })
    }
}
