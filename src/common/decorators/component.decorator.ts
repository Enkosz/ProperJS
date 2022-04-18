import {Reflector} from "../../utils/reflector";
import {ComponentType} from "../type/component-type";

export const Component = (): ClassDecorator => {
    return (target: Object) => {
        Reflector.setMetadata<ComponentType>(target, "type", ComponentType.COMPONENT)
    }
}
