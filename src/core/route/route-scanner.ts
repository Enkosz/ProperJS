import Logger from "@utils/logger";
import {ExceptionHandler} from "../exception/exception-handler";
import {ApplicationServerAdapter } from "../adapter/application-server-adapter";
import {RouteResolver} from "./route-resolver";
import {ApplicationContainer} from "@core/container/application-container";
import MetaType from "@common/type/meta-type";
import {Controller} from "@common/type/controller";

export default class RouteScanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly container: ApplicationContainer;
    private readonly routeResolver: RouteResolver
    private readonly exceptionHandler: ExceptionHandler;
    private readonly app: ApplicationServerAdapter

    constructor(container: ApplicationContainer, app: ApplicationServerAdapter) {
        this.container = container;
        this.app = app;
        this.exceptionHandler = new ExceptionHandler();
        this.routeResolver = new RouteResolver(this.app);
    }

    public scanRoutes() {
        this.logger.log("Scanning routes...")

        this.container
            .getControllers()
            .forEach((metaType: MetaType<Controller>) => {
                this.logger.log("Registered", metaType.reference)
                this.routeResolver.resolveControllerRoutes(metaType)
            })

        this.app.registerExceptionHandler();
    }
}
