import ComponentScanner from "../component-scanner";
import Component from "@common/type/component";
import Logger from "@utils/logger";
import {promises as fs} from "fs";
import {ComponentType} from "@common/type/component-type";
import ConfigurationResolver from "../../configuration/configuration-resolver";
import path from 'path'
import {Reflector} from "@utils/reflector";

export default class DirectoryComponentScanner implements ComponentScanner {

    private readonly logger = new Logger(this.constructor.name)
    private readonly path: string

    constructor() {
        this.path = ConfigurationResolver.resolveConfigurations().scan
    }

    async scanComponents(): Promise<Component[]> {
        this.logger.log("Loading component files from", this.path)
        const files = await fs.readdir(this.path);

        const components: Component[] = []
        for(const file of files) {
            const module = await import(path.join(this.path, file))
            const component = module.default;

            // TODO Handle cases where module is undefined or is not default
            if(component) {
                const type = Reflector.getMetadata<ComponentType>(module.default, "type")
                components.push({reference: component, type})
            }
        }

        return components;
    }
}
