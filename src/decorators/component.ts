import {Reflector} from "../utils/reflector";
import {ComponentType} from "../component-type";

export default (): ClassDecorator => {
    return (target: Object) => {
        Reflector.setMetadata<ComponentType>(target, "type", ComponentType.COMPONENT)
    }
}
