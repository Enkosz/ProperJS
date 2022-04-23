import DependencyExample from "./dependency.example";
import {Component} from "@common/decorators/component.decorator";

@Component()
export default class ComponentExample {

    constructor(private readonly dependency: DependencyExample) {}

    public doSomething() {
        console.log("Hello")
    }
}
