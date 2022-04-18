import Logger from "@utils/logger";
import {ApplicationServerAdapter} from "@core/adapter/application-server-adapter";
import ApplicationContextFactory from "@core/application-context-factory";

export class ApplicationFactory {

    private static readonly logger = new Logger(this.constructor.name)

    public static async create(): Promise<ApplicationServerAdapter> {
        this.logger.log("Starting ProperJS application ...")
        const applicationContext = await ApplicationContextFactory.createWebApplicationContext();

        return applicationContext.applicationServerAdapter;
    }
}
