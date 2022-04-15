import {Reflector} from "../utils/reflector";
import Constants from "../constants/constants";

export default (path: string = "/"): ClassDecorator => {
    return (target: Object) => {
        Reflector.setMetadata<String>(target, "path", path)
        Reflector.setMetadata<String>(target, "type", Constants.CONTROLLER_TYPE_METADATA)
    }
}
