import {ApplicationFactory} from "properjs/src/core";

async function bootstrap() {
    const applicationServerAdapter = await ApplicationFactory.create();

    applicationServerAdapter.listen(3000);
}

bootstrap();
