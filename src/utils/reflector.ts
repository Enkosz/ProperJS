import 'reflect-metadata'

export class Reflector {

    public static getMetadata<T>(target: Object, key: String): T {
        return Reflect.getMetadata(key, target);
    }

    public static setMetadata<T>(target: Object, key: PropertyKey, value: T): void {
        Reflect.defineMetadata(key, value, target)
    }

    public static getMetadataKeys(target: Object): Array<String> {
        return Reflect.getMetadataKeys(target);
    }
}
