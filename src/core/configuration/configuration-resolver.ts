import fs from "fs";
import path from "path";
import defaultConfig from '../../proper.default.config'
import ProperApplicationConfig from "../../common/type/proper-application-config";

export default class ConfigurationResolver {

    private static configurations: ProperApplicationConfig

    public static resolveConfigurations(): ProperApplicationConfig  {
        if(this.configurations)
            return this.configurations

        const processPath = process.cwd();
        const hasCustomConfig = ConfigurationResolver.containsCustomConfigurations(processPath)

        if (hasCustomConfig)
            this.configurations = require(path.join(processPath, "proper.config.ts"))
        else
            this.configurations = defaultConfig;

        return this.configurations
    }

    private static containsCustomConfigurations(path: string): Boolean {
        const files = fs.readdirSync(path)

        for(const file of files) {
            if(file === "proper.config.ts")
                return true;
        }

        return false
    }
}
