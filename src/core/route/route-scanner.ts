import Container from "../container/container";
import {Reflector} from "../../utils/reflector";
import Logger from "../../utils/logger";
import {ExceptionHandler} from "../exception/exception-handler";
import {ApplicationServerAdapter } from "../../application-server-adapter";

export default class RouteScanner {

    private readonly logger = new Logger(this.constructor.name)

    private readonly container: Container;
    private readonly exceptionHandler: ExceptionHandler;
    private readonly app: ApplicationServerAdapter

    constructor(container: Container, app: ApplicationServerAdapter) {
        this.container = container;
        this.app = app;
        this.exceptionHandler = new ExceptionHandler();
    }

    public scanRoutes() {
        this.logger.log("Scanning routes...")

        const controllers = this.container.getControllers();

        controllers.forEach((wrapper, _: any) => {
            const instance: any = wrapper.instance;
            const instancePrototype = Object.getPrototypeOf(instance)

            const keys = Object.getOwnPropertyNames(instancePrototype)
                .filter((method) => {
                    const descriptor = Object.getOwnPropertyDescriptor(instancePrototype, method);
                    if (!descriptor || descriptor.set || descriptor.get) {
                        return false;
                    }
                    return method !== "constructor"
                })

            keys.forEach((key) => {
                const {method, path} = Reflector.getMetadata(instance, key);
                const handler = instancePrototype[key]

                this.app.registerRoute({path, method, handler})
                this.logger.log("Registered route:", instance.constructor.name , method, path)
            })

            this.app.registerExceptionHandler();
        })
    }
}
