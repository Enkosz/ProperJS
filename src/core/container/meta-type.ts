export default class MetaType<T> {
    protected instance: T

    constructor(instance: T = null!) {
        this.instance = instance;
    }
}
