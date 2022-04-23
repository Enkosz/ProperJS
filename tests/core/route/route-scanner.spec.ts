import RouteScanner from "@core/route/route-scanner";
import {ApplicationContainer} from "@core/container/application-container";
import {ExpressApplicationServer} from "@core/adapter/express-application-server";
import {RouteResolver} from "@core/route/route-resolver";
import MetaType from "@common/type/meta-type";
import {Controller} from "@common/type/controller";
jest.mock('@core/adapter/express-application-server')
jest.mock('@core/container/application-container')
jest.mock('@core/route/route-resolver')


describe('RouteScanner', () => {

    const applicationServerAdapter = new ExpressApplicationServer();
    const container = new ApplicationContainer();
    const resolver = new RouteResolver(applicationServerAdapter);
    const routeScanner = new RouteScanner(container, applicationServerAdapter, resolver);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should resolve controller when container contains controllers', () => {
        // given
        const metaTypeMock = new MetaType<Controller>(jest.fn());
        const controllerMockMap = new Map<String, MetaType<Controller>>();
        controllerMockMap.set("mock", metaTypeMock);
        jest.spyOn(container, 'getControllers').mockReturnValue(controllerMockMap)

        // when
        routeScanner.scanRoutes();

        // then
        expect(resolver.resolveControllerRoutes).toBeCalledTimes(1);
        expect(resolver.resolveControllerRoutes).toBeCalledWith(metaTypeMock);
    })

    it('should register global exception handler once when routes are resolved', () => {
        // when
        routeScanner.scanRoutes();

        // then
        expect(applicationServerAdapter.registerExceptionHandler).toBeCalledTimes(1)
    })
})
