import MetaType from "@common/type/meta-type";
import {Reflector} from "@utils/reflector";
import {ApplicationContainer} from "@core/container/application-container";

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
        let constructorParameters = Reflector.getMetadata<any>(metaType.reference, "design:paramtypes");

        constructorParameters
            .forEach((parameter: any) => {
                metaType.dependencies.add(parameter)
            })
    }
}
