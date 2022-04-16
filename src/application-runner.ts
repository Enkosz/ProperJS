import AnnotationApplicationContext from "./core/container/annotation-application-context";
import {Scanner} from "./core/scanner/scanner";
import Injector from "./core/injector/injector";
import RouteScanner from "./core/route/route-scanner";
import Logger from "./utils/logger";
import {Reflector} from "./utils/reflector";
import {ApplicationServerAdapter} from "./application-server-adapter";
import {ExpressApplicationServer} from "./express-application-server";

export class ApplicationRunner {

    private static readonly logger = new Logger(this.constructor.name)

    private static readonly app: ApplicationServerAdapter = new ExpressApplicationServer();

    private static readonly container: AnnotationApplicationContext = new AnnotationApplicationContext();

    private static readonly scanner: Scanner = new Scanner(this.container);
    private static readonly injector: Injector = new Injector(this.container);
    private static readonly routeScanner: RouteScanner = new RouteScanner(this.container, this.app);

    public static async run(app: any) {
        this.logger.log("Starting ProperJS application ...")
        const applicationDir = Reflector.getMetadata<string>(app, "appDir") + "/src"

        await this.scanner.scan(applicationDir);
        this.injector.inject();
        this.routeScanner.scanRoutes();

        this.app.listen(3000, () => {
            this.logger.log("ProperJS started on port: 3000")
        })
    }
}
