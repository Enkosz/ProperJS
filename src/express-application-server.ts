import {ApplicationServerAdapter, Route} from "./application-server-adapter";
import express from "express";
import {Express} from "express/ts4.0";
import {ExceptionHandler} from "./core/exception/exception-handler";

export class ExpressApplicationServer implements ApplicationServerAdapter {

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

    public listen(port: number, handler: any) {
        this.application.listen(port, handler)
    }

    public registerExceptionHandler() {
        this.application.use((error: any, req: any, res: any, _: any) => {
            const response = this.exceptionHandler.handle(error);

            res.status(500).send(response);
        })
    }
}
