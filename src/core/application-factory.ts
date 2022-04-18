import Logger from "../utils/logger";
import {ApplicationServerAdapter} from "./adapter/application-server-adapter";
import ApplicationContextFactory from "@core/application-context-factory";
import WebApplicationContext from "@core/context/web-application-context";

export class ApplicationFactory {

    private static readonly logger = new Logger(this.constructor.name)

    private static readonly applicationContext: WebApplicationContext = ApplicationContextFactory.createWebApplicationContext();

    public static async create(): Promise<ApplicationServerAdapter> {
        this.logger.log("Starting ProperJS application ...")

        await this.applicationContext.init();
        return this.applicationContext.applicationServerAdapter;
    }
}
