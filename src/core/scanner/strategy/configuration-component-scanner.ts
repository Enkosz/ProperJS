import ComponentScanner from "../component-scanner";
import Component from "../../../common/type/component";

export default class ConfigurationComponentScanner implements ComponentScanner {
    scanComponents(): Promise<Component[]> {
        return Promise.resolve([]);
    }
}
