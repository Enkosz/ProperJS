import {Reflector} from "../utils/reflector";

export const ProperJSApplication = (dir: string): ClassDecorator => {
    return (target: object) => {
        Reflector.setMetadata<String>(target, "appDir", dir)
    }
}
