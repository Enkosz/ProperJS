import AnnotationApplicationContext from "../container/annotation-application-context";
import Logger from "../../utils/logger";

export default class Injector {

    private readonly logger: Logger = new Logger(this.constructor.name)
    private readonly container: AnnotationApplicationContext

    constructor(container: AnnotationApplicationContext) {
        this.container = container;
    }

    public inject() {
        this.injectComponents();
        this.injectControllers();
    }

    private injectComponents() {
        this.logger.log("Injecting components...")
        const components = this.container.getComponents();

        components.forEach((wrapper, component) => {
            this.injectComponent(component, wrapper)
        })
    }

    private injectControllers() {
        this.logger.log("Injecting controllers...")
        const controllers = this.container.getControllers();

        controllers.forEach((wrapper, controller) => {
            this.injectController(controller, wrapper);
        })
    }

    private injectController(controller: any, metaType: any) {
        if(metaType.instance != null)
            return;

        let args: any[] = [];
        let params: [] = Reflect.getMetadata("design:paramtypes", controller) || []

        params.forEach(param => {
            const componentType: any = this.container.getComponents().get(param)

            if (componentType === undefined)
                throw new Error(`Unregistered component type: ${param}`);

            if (componentType.instance == null)
                this.injectComponent(param, componentType);

            args.push(componentType.instance);
        });

        metaType.instance = new controller(...args)
        this.logger.log("Creating instance of controller: ", controller)
    }

    private injectComponent(component: any, wrapper: any) {
        if (wrapper.instance != null)
            return;

        let args: any[] = [];
        let params: [] = Reflect.getMetadata("design:paramtypes", component) || []

        params.forEach(param => {
            const componentType: any = this.container.getComponents().get(param)

            if (componentType === undefined)
                throw new Error(`Unregistered component type: ${param}`);

            if (componentType.instance == null)
                this.injectComponent(param, componentType);

            args.push(componentType.instance);
        });

        wrapper.instance = new component(...args)
        console.log("Creating instance of component type: ", component)

    }
}
