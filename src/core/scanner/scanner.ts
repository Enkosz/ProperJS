import {ComponentLoader} from "../loader/component-loader";
import AnnotationApplicationContext from "../container/annotation-application-context";
import Constants from "../../constants/constants";
import Logger from "../../utils/logger";
import {ComponentType} from "../../component-type";

export class Scanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly loader: ComponentLoader
    private readonly container: AnnotationApplicationContext

    constructor(container: AnnotationApplicationContext) {
        this.loader = new ComponentLoader();
        this.container = container;
    }

    public async scan(applicationDirectory: string): Promise<void> {
        this.logger.log("Scanning components ...")
        const components = await this.loader.loadComponents(applicationDirectory);

        components.map(({component, type}: any) => {
            if(type === ComponentType.COMPONENT)
                this.container.addComponent(component)
            else if (type === ComponentType.CONTROLLER) {
                this.container.addController(component)
            }
        })

        this.logger.log(`Scanned ${components.length} components`)
    }
}
