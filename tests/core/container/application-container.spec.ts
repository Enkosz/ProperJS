import {ApplicationContainer} from "@core/container/application-container";
import {Component} from "@common/decorators/component.decorator";
import {Controller} from "@common/decorators/controller.decorator";

describe('ApplicationContainer', function () {

    const applicationContainer = new ApplicationContainer();

    it('should add a provider when it does not exists', () => {
        // given
        @Component()
        class Provider {}

        // when
        applicationContainer.addProvider(Provider);

        // then
        expect(applicationContainer.getProviders().size).toEqual(1)
        expect(applicationContainer.getProvider(Provider)).toBeDefined()
    })

    it('should not add a provider when it already exists', () => {
        // given
        @Component()
        class Provider {}
        applicationContainer.addProvider(Provider);

        // when
        applicationContainer.addProvider(Provider);

        // then
        expect(applicationContainer.getProviders().size).toEqual(1)
    })

    it('should add a controller when it does not exists', () => {
        // given
        @Controller()
        class ControllerExample {}

        // when
        applicationContainer.addController(ControllerExample);

        // then
        expect(applicationContainer.getControllers().size).toEqual(1)
        expect(applicationContainer.getController(ControllerExample)).toBeDefined()
    })

    it('should not add a controller when it already exists', () => {
        // given
        @Controller()
        class ControllerExample {}
        applicationContainer.addController(ControllerExample);

        // when
        applicationContainer.addController(ControllerExample);

        // then
        expect(applicationContainer.getControllers().size).toEqual(1)
    })
});
