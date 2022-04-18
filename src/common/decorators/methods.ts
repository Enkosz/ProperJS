import {HttpMethod} from "@core/adapter/application-server-adapter";
import {Reflector} from "@utils/reflector";

export const Get = (path: String = "/"): MethodDecorator => {
    return (target: Object, key, descriptor) => {
        Reflector.setMetadata(
            target,
            key,
            {
                method: HttpMethod.GET,
                path: path
            },
        );

        return descriptor;
    }
}
