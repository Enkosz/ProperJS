import {HttpMethod} from "../application-server-adapter";

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
