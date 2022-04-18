import ProperApplicationContext from "./container/proper-application-context";
import ApplicationContext from "./container/application-context";

export default class ApplicationContextFactory {

    static createApplicationContext(): ApplicationContext {
        return new ProperApplicationContext();
    }
}
