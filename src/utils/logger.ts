import { Logger as TSLogger } from "tslog";

export default class Logger {

    private readonly logger: TSLogger;

    constructor(name: string) {
        this.logger = new TSLogger({name})
    }

    log(...args: any) {
        this.logger.info(...args)
    }

    error(...args: any) {
        this.logger.error(...args)
    }

    warn(...args: any) {
        this.logger.warn(...args)
    }
}
