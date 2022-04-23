import ComponentInterface from "./component.interface";
import DependencyExample from "./dependency.example";
import {Component} from "@common/decorators/component.decorator";
import {Inject} from "@common/decorators/inject";

@Component()
export default class ComponentExample implements ComponentInterface {

    constructor(@Inject('PROVIDER') private readonly dependency: DependencyExample) {
        dependency.doSomething();
    }

    public doSomething() {
        console.log("Hello")
    }
}
