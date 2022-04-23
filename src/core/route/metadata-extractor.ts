export default class MetadataExtractor {
    static extractMetadataFromPrototype(prototype: any) {
        return Object.getOwnPropertyNames(prototype)
            .filter((method) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
                if (!descriptor || descriptor.set || descriptor.get) {
                    return false;
                }
                return method !== "constructor"
            })
            .map((method) => prototype[method])
    }
}
