import {promises as fs} from 'fs';
import {Reflector} from "../../utils/reflector";
import Logger from "../../utils/logger";

export class ComponentLoader {

    private readonly logger = new Logger(this.constructor.name)

    public async loadComponents(path: string): Promise<Array<Object>> {
        this.logger.log("Loading component files from", path)
        const files = await fs.readdir(path);

        const components = []
        for(const file of files) {
            const module = await import(path + '/' + file)

            const component = module.default;
            const type = Reflector.getMetadata<String>(module.default, "type")

            components.push({component, type})
        }

        this.logger.log("Loaded " + components.length + " components")
        return components;
    }
}
