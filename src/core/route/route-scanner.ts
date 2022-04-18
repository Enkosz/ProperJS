import WebApplicationContainer from "../container/web-application-container";
import {Reflector} from "../../utils/reflector";
import Logger from "../../utils/logger";
import {ExceptionHandler} from "../exception/exception-handler";
import {ApplicationServerAdapter } from "../adapter/application-server-adapter";
import {RouteResolver} from "./route-resolver";

export default class RouteScanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly container: WebApplicationContainer;
    private readonly routeResolver: RouteResolver
    private readonly exceptionHandler: ExceptionHandler;
    private readonly app: ApplicationServerAdapter

    constructor(container: WebApplicationContainer, app: ApplicationServerAdapter) {
        this.container = container;
        this.app = app;
        this.exceptionHandler = new ExceptionHandler();
        this.routeResolver = new RouteResolver(this.app);
    }

    public scanRoutes() {
        this.logger.log("Scanning routes...")

        this.container
            .getControllers()
            .forEach((wrapper, type: any) => {
                this.logger.log("Registered", type.name)
                this.routeResolver.resolveControllerRoutes(wrapper)
            })

        this.app.registerExceptionHandler();
    }
}
