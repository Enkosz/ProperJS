import WebApplicationContainer from "../container/web-application-container";
import MetaType from "../../common/type/meta-type";
import {Reflector} from "@utils/reflector";

export default class DependencyDiscover {

    private readonly container: WebApplicationContainer

    constructor(container: WebApplicationContainer) {
        this.container = container;
    }

    public discoverDependencies() {
        this.discoverProvidersDependencies();
        this.discoverControllerDependencies();
    }

    private discoverControllerDependencies() {
        this.container.getControllers()
            .forEach(metaType => this.exploreDependencyFromMetaType(metaType))
    }

    private discoverProvidersDependencies() {
        this.container.getProviders()
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
