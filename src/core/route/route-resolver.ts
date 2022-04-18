import {Reflector} from "@utils/reflector";
import {ApplicationServerAdapter} from "../adapter/application-server-adapter";
import Logger from "@utils/logger";
import MetaType from "@common/type/meta-type";
import {Controller} from "@common/type/controller";

export class RouteResolver {

    private readonly logger = new Logger(this.constructor.name)
    private readonly app: ApplicationServerAdapter

    constructor(app: ApplicationServerAdapter) {
        this.app = app;
    }

    public resolveControllerRoutes(metaType: MetaType<Controller>) {
        const instancePrototype = Object.getPrototypeOf(metaType.instance)

        this.getControllerMethodHandlersFromPrototype(instancePrototype)
            .forEach(handler => this.registerRouteMethodHandlerFromPrototype(handler, instancePrototype))
    }

    private registerRouteMethodHandlerFromPrototype(handler: any, instance: any) {
        const {method, path} = Reflector.getMetadata(instance, handler.name);

        this.app.registerRoute({path, method, handler})
        this.logger.log(method, path)
    }

    private getControllerMethodHandlersFromPrototype(prototype: any) {
        return Object.getOwnPropertyNames(prototype)
            .filter((method) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
                if (!descriptor || descriptor.set || descriptor.get) {
                    return false;
                }
                return method !== "constructor"
            })
            .map((method) => prototype[method])
    }
}

