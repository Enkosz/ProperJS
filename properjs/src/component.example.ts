import ComponentInterface from "./component.interface";
import DependencyExample from "./dependency.example";
import {Component} from "@common/decorators/component.decorator";

@Component()
export default class ComponentExample implements ComponentInterface {

    constructor(private readonly dependency: DependencyExample) {
        dependency.doSomething();
    }

    public doSomething() {
        console.log("Hello")
    }
}
