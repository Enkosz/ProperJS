import {ApplicationFactory} from "@core/application-factory";

async function bootstrap() {
    const applicationServerAdapter = await ApplicationFactory.create();

    applicationServerAdapter.listen(3000);
}

bootstrap();
