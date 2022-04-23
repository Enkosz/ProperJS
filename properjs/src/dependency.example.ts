    import {Component} from "@common/decorators/component.decorator";

    @Component()
    export default class DependencyExample {
        constructor() {}

        public doSomething() {
            console.log("Called from dependency")
        }
    }
