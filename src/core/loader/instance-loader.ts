import WebApplicationContainer from "../container/web-application-container";
import Logger from "../../utils/logger";
import ComponentScanner from "../scanner/component-scanner";
import {ComponentType} from "../../common/type/component-type";

export class InstanceLoader {

    private readonly logger = new Logger(this.constructor.name)

    private readonly container: WebApplicationContainer
    private readonly scanner: ComponentScanner

    constructor(container: WebApplicationContainer, scanner: ComponentScanner) {
        this.container = container;
        this.scanner = scanner;
    }

    public async load(): Promise<void> {
        this.logger.log("Scanning components ...")
        const components = await this.scanner.scanComponents();

        components.map(({reference, type}: any) => {
            if(type === ComponentType.COMPONENT)
                this.container.addProvider(reference)
            else if (type === ComponentType.CONTROLLER) {
                this.container.addController(reference)
            }
        })

        this.logger.log(`Scanned ${components.length} components`)
    }
}
