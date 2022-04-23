import {InstanceLoader} from "@core/loader/instance-loader";
import {ApplicationContainer} from "@core/container/application-container";
import ConfigurationComponentScanner from "@core/scanner/strategy/configuration-component-scanner";
import Component from "@common/type/component";
import {ComponentType} from "@common/type/component-type";
jest.mock('@core/scanner/strategy/configuration-component-scanner')

describe('InstanceLoader', () => {

    const container = new ApplicationContainer();
    const scanner = new ConfigurationComponentScanner();

    const loader = new InstanceLoader(container, scanner);

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should add the providers when component are scanned', async function () {
        // given
        const components: Component[] = [
            {
                type: ComponentType.COMPONENT,
                reference: jest.fn()
            }
        ]
        const scanComponentsSpy = jest.spyOn(scanner, "scanComponents").mockResolvedValue(components)
        const addProviderSpy = jest.spyOn(container, "addProvider")

        // when
        await loader.load();

        // then
        expect(scanComponentsSpy).toBeCalledTimes(1)
        expect(addProviderSpy).toBeCalledTimes(1)
        expect(addProviderSpy).toBeCalledWith(components[0].reference)
        expect(container.getProviders().size).toBe(1)
    });

    it('should add the controllers when component are scanned', async function () {
        // given
        const components: Component[] = [
            {
                type: ComponentType.CONTROLLER,
                reference: jest.fn()
            }
        ]
        const scanComponentsSpy = jest.spyOn(scanner, "scanComponents").mockResolvedValue(components)
        const addControllerSpy = jest.spyOn(container, "addController")

        // when
        await loader.load();

        // then
        expect(scanComponentsSpy).toBeCalledTimes(1)
        expect(addControllerSpy).toBeCalledTimes(1)
        expect(addControllerSpy).toBeCalledWith(components[0].reference)
        expect(container.getControllers().size).toBe(1)
    });
})
