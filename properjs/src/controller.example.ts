import {Get} from "../../src/common/decorators/methods";
import {Controller} from "../../src/common/decorators/controller.decorator";

@Controller()
export default class ControllerExample {

    constructor() {
        console.log("Called controller")
    }

    @Get()
    public hello() {
        return "Hello World";
    }
}
