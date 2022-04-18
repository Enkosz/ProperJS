import WebApplicationContainer from "../container/web-application-container";
import MetaType from "../../common/type/meta-type";

export default class DependencyDiscover {

    private readonly container: WebApplicationContainer

    constructor(container: WebApplicationContainer) {
        this.container = container;
    }

    public discoverDependencies() {
        this.container.getProviders()
            .forEach((value => this.exploreDependencyFromMetaType(value)))
    }

    private exploreDependencyFromMetaType(metaType: MetaType<any>) {
        let constructorParameters = Reflect.getMetadata("design:paramtypes", metaType.reference);

        constructorParameters
            .forEach((parameter: any) => {
                metaType.dependencies.add(parameter)
            })
    }
}
