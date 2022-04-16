import Controller from "../../src/decorators/controller.decorator";
import {Get} from "../../src/decorators/methods";

@Controller()
export default class ExampleController {

    @Get()
    public getExample() {
        return "Hello World!"
    }

    @Get('/error')
    public errorExample() {
        throw new Error("Example of exception")
    }
}
