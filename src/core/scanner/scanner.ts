import {ComponentLoader} from "../loader/component-loader";
import Container from "../container/container";
import Constants from "../../constants/constants";
import Logger from "../../utils/logger";

export class Scanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly loader: ComponentLoader
    private readonly container: Container

    constructor(container: Container) {
        this.loader = new ComponentLoader();
        this.container = container;
    }

    public async scan(applicationDirectory: string): Promise<void> {
        this.logger.log("Scanning components ...")
        const components = await this.loader.loadComponents(applicationDirectory);

        components.map(({component, type}: any) => {
            if(type === Constants.COMPONENT_TYPE_METADATA)
                this.container.addComponent(component)
            else if (type === Constants.CONTROLLER_TYPE_METADATA) {
                this.container.addController(component)
            }
        })

        this.logger.log(`Scanned ${components.length} components`)
    }
}
