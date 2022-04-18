import {Get} from "@common/decorators/methods";
import {Controller} from "@common/decorators/controller.decorator";

@Controller()
export default class ControllerExample {

    constructor() {}

    @Get()
    public hello() {
        return "Hello World";
    }
}
