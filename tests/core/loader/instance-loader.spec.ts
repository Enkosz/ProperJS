import {InstanceLoader} from "@core/loader/instance-loader";
import WebApplicationContainer from "@core/container/web-application-container";

describe("InstanceLoader", () => {

    const container = new WebApplicationContainer()
    const instanceLoader = new InstanceLoader(container, null!);

    test('it should add a component when ', () => {
        expect(0).toBe(0);
    });
})
