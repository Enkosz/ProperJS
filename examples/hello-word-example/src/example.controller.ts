import {Controller, Get} from "properjs/src";
import ExampleComponent from "./example.component";

@Controller()
export default class ExampleController {

    constructor(private readonly exampleComponent: ExampleComponent) {}

    @Get()
    public helloWorld(): String {
        return this.exampleComponent.helloWorld();
    }
}
