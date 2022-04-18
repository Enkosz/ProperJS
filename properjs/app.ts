import ApplicationContextFactory from "@core/application-context-factory";
import ComponentExample from "./src/component.example";

async function bootstrap() {
    const applicationContext = await ApplicationContextFactory.createApplicationContext();

    const provider = applicationContext.get<ComponentExample>(ComponentExample)
    provider.doSomething();
}

bootstrap();
