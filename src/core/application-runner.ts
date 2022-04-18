import WebApplicationContainer from "./container/web-application-container";
import {InstanceLoader} from "./loader/instance-loader";
import Injector from "./injector/injector";
import RouteScanner from "./route/route-scanner";
import Logger from "../utils/logger";
import {ApplicationServerAdapter} from "./adapter/application-server-adapter";
import {ExpressApplicationServer} from "./adapter/express-application-server";
import DependencyDiscover from "./discovery/dependency-discover";

export class ApplicationRunner {

    private static readonly logger = new Logger(this.constructor.name)

    private static readonly app: ApplicationServerAdapter = new ExpressApplicationServer();
    private static readonly container: WebApplicationContainer = new WebApplicationContainer();

    private static readonly instanceLoader: InstanceLoader = new InstanceLoader(this.container);
    private static readonly discover: DependencyDiscover = new DependencyDiscover(this.container);
    private static readonly injector: Injector = new Injector(this.container);
    private static readonly routeScanner: RouteScanner = new RouteScanner(this.container, this.app);

    public static async run() {
        this.logger.log("Starting ProperJS application ...")

        await this.instanceLoader.load();
        await this.discover.discoverDependencies();

        this.injector.inject();
        this.routeScanner.scanRoutes();

        this.app.listen(3000, () => {
            this.logger.log("ProperJS started on port: 3000")
        })
    }
}
