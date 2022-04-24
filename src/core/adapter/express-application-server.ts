import {ApplicationServerAdapter, HttpMethod, Route} from "./application-server-adapter";
import express, {Express} from "express";
import {ExceptionHandler} from "../exception/exception-handler";
import Logger from "@utils/logger";

export class ExpressApplicationServer implements ApplicationServerAdapter {

    private readonly logger = new Logger(this.constructor.name);

    private readonly application: Express
    private readonly exceptionHandler: ExceptionHandler;

    constructor() {
        this.application = express();
        this.exceptionHandler = new ExceptionHandler();

        this.registerExceptionHandler();
    }

    public registerRoute({path, method, handler}: Route) {
        this.application.get(path, (req, res) => {
            const response = handler()

            res.json(response)
        })
    }

    public listen(port: number) {
        this.application.listen(port, () => {
            this.logger.log("ProperJS application running on port:", port)
        })
    }

    public registerExceptionHandler() {
        this.application.use((error: any, req: any, res: any, _: any) => {
            const response = this.exceptionHandler.handle(error);

            res.status(500).send(response);
        })
    }
}
