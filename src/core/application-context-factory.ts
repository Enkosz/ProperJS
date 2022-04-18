import ProperApplicationContext from "./context/proper-application-context";
import WebApplicationContext from "@core/context/web-application-context";

export default class ApplicationContextFactory {

    static async createApplicationContext(): Promise<ProperApplicationContext> {
        const applicationContext = new ProperApplicationContext();

        return applicationContext.init();
    }

    static async createWebApplicationContext(): Promise<WebApplicationContext> {
        const applicationContext = new WebApplicationContext();

        return applicationContext.init();
    }
}
