import DependencyDiscover from "@core/discovery/dependency-discover";
import {ApplicationContainer} from "@core/container/application-container";
import {Component} from "@common/decorators/component.decorator";
import {Controller} from "@common/decorators/controller.decorator";

describe("DependencyDiscover", () => {

    let applicationContainer: ApplicationContainer
    let dependencyDiscover: DependencyDiscover

    @Component()
    class DependencyExample {}

    @Component()
    class ComponentExample {
        constructor(private readonly _: DependencyExample) {}
    }

    @Controller()
    class ControllerExample {
        constructor(private readonly _: DependencyExample) {}
    }

    beforeEach(() => {
        applicationContainer = new ApplicationContainer();
        dependencyDiscover = new DependencyDiscover(applicationContainer);
    })

    it('should throw an error when a constructor dependency provider is not registered in the container', function () {
        // given
        applicationContainer.addProvider(ComponentExample)

        // when then
        expect(dependencyDiscover.discoverDependencies).toThrow()
    });

    it('should discover dependency meta type of provider when dependency is registered in the container', function () {
        // given
        applicationContainer.addProvider(ComponentExample)
        applicationContainer.addProvider(DependencyExample)

        // when
        dependencyDiscover.discoverDependencies();
        const componentProvider = applicationContainer.getProvider(ComponentExample);
        const dependencyProvider = applicationContainer.getProvider(DependencyExample);

        // then
        expect(componentProvider).toBeDefined();
        expect(dependencyProvider).toBeDefined();
        expect(componentProvider?.dependencies).toContain(dependencyProvider)
        expect(componentProvider?.dependencies.size).toEqual(1)
    });

    it('should discover dependency meta type of controller when dependency is registered in the container', function () {
        // given
        applicationContainer.addController(ControllerExample)
        applicationContainer.addProvider(DependencyExample)

        // when
        dependencyDiscover.discoverDependencies();
        const controllerExample = applicationContainer.getController(ControllerExample);
        const dependencyProvider = applicationContainer.getProvider(DependencyExample);

        // then
        expect(controllerExample).toBeDefined();
        expect(dependencyProvider).toBeDefined();
        expect(controllerExample?.dependencies).toContain(dependencyProvider)
        expect(controllerExample?.dependencies.size).toEqual(1)
    });

    it('should skip discovery of dependency when default constructor is used', function () {
        // given
        applicationContainer.addProvider(DependencyExample)

        // when
        dependencyDiscover.discoverDependencies();
        const dependencyProvider = applicationContainer.getProvider(DependencyExample);

        // then
        expect(dependencyProvider).toBeDefined();
        expect(dependencyProvider?.dependencies.size).toEqual(0)
    });
})
