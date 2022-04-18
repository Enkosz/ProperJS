import ComponentInterface from "./component.interface";
import DependencyExample from "./dependency.example";
import {Component} from "../../src/common/decorators/component.decorator";

@Component()
export default class ComponentExample implements ComponentInterface {

    constructor(private readonly dependency: DependencyExample) {}

    public doSomething() {
        console.log("Hello")
    }
}
