import {HttpMethod} from "../../core/adapter/application-server-adapter";

export const Get = (path: String = "/"): MethodDecorator => {
    return (target: Object, key, descriptor) => {
        Reflect.defineMetadata(
            key,
            {
                method: HttpMethod.GET,
                path: path
            },
            target,
        );

        return descriptor;
    }
}
