import ProperApplicationContext from "@core/context/proper-application-context";
import RouteScanner from "@core/route/route-scanner";
import {ApplicationServerAdapter} from "@core/adapter/application-server-adapter";
import {ExpressApplicationServer} from "@core/adapter/express-application-server";

export default class WebApplicationContext extends ProperApplicationContext {

    private readonly routeScanner: RouteScanner
    private readonly _applicationServerAdapter: ApplicationServerAdapter

    constructor(applicationServerAdapter: ApplicationServerAdapter = new ExpressApplicationServer()) {
        super();
        this._applicationServerAdapter = applicationServerAdapter;
        this.routeScanner = new RouteScanner(this.container, this.applicationServerAdapter)
    }

    async init(): Promise<this> {
        await super.init();
        await this.routeScanner.scanRoutes();

        return this;
    }

    get applicationServerAdapter(): ApplicationServerAdapter {
        return this._applicationServerAdapter;
    }
}
