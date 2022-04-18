import ProperApplicationContext from "./context/proper-application-context";
import ApplicationContext from "./context/application-context";
import WebApplicationContext from "@core/context/web-application-context";
import {ApplicationServerAdapter} from "@core/adapter/application-server-adapter";
import {ExpressApplicationServer} from "@core/adapter/express-application-server";

export default class ApplicationContextFactory {

    static createApplicationContext(): ApplicationContext {
        return new ProperApplicationContext();
    }

    static createWebApplicationContext(): WebApplicationContext {
        return new WebApplicationContext();
    }
}
