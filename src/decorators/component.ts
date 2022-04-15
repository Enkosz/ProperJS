import Constants from "../constants/constants";
import {Reflector} from "../utils/reflector";

export default (): ClassDecorator => {
    return (target: Object) => {
        Reflector.setMetadata<String>(target, "type", Constants.COMPONENT_TYPE_METADATA)
    }
}
