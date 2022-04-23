import Logger from "@utils/logger";
import {ApplicationServerAdapter } from "../adapter/application-server-adapter";
import {RouteResolver} from "./route-resolver";
import {ApplicationContainer} from "@core/container/application-container";

export default class RouteScanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly container: ApplicationContainer;
    private readonly routeResolver: RouteResolver
    private readonly app: ApplicationServerAdapter

    constructor(container: ApplicationContainer, app: ApplicationServerAdapter, resolver: RouteResolver = new RouteResolver(app)) {
        this.container = container;
        this.app = app;
        this.routeResolver = resolver
    }

    public scanRoutes() {
        this.logger.log("Scanning routes...")

        this.container
            .getControllers()
            .forEach((metaType) => {
                this.logger.log("Registered", metaType.reference)
                this.routeResolver.resolveControllerRoutes(metaType)
            })

        this.app.registerExceptionHandler();
    }
}
