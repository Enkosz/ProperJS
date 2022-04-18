import {Get} from "@common/decorators/methods";
import {Controller} from "@common/decorators/controller.decorator";
import ComponentExample from "./component.example";

@Controller()
export default class ControllerExample {

    constructor(private readonly component: ComponentExample) {
        console.log("Called controller");
        this.component.doSomething();
    }

    @Get()
    public hello() {
        return "Hello World";
    }
}
