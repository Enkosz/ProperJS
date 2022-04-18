import {Reflector} from "../../utils/reflector";
import {ComponentType} from "../type/component-type";

export const Controller = (path: string = "/"): ClassDecorator => {
    return (target: Object) => {
        Reflector.setMetadata<String>(target, "path", path)
        Reflector.setMetadata<ComponentType>(target, "type", ComponentType.CONTROLLER)
    }
}
