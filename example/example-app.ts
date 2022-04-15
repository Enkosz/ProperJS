import {ProperJSApplication} from "../src/decorators/properjs-application";
import {ApplicationRunner} from "../src/application-runner";

@ProperJSApplication(__dirname)
export class ExampleApp {

    public static async run() {
         await ApplicationRunner.run(ExampleApp);
    }
}

ExampleApp.run();
