import {RouteResolver} from "@core/route/route-resolver";
import {ExpressApplicationServer} from "@core/adapter/express-application-server";
import MetaType from "@common/type/meta-type";
import {Controller as ControllerDecorator} from "@common/decorators/controller.decorator";
import {Get} from "@common/decorators/methods";
import {Controller} from "@common/type/controller";
import {HttpMethod} from "@core/adapter/application-server-adapter";
import MetadataExtractor from "@core/route/metadata-extractor";
jest.mock("@core/adapter/express-application-server")

describe('RouteResolver', function () {

    const applicationServer = new ExpressApplicationServer();
    const routeResolver = new RouteResolver(applicationServer);

    @ControllerDecorator()
    class ExampleController {

        @Get()
        public exampleMethod() {}
    }

    it('should register route with correct handler when metatype contains all information', function () {
        // given
        const metaType = new MetaType<Controller>(ExampleController);
        metaType.instance = new metaType.reference();
        const metadata = MetadataExtractor.extractMetadataFromPrototype(Object.getPrototypeOf(metaType.instance))

        // when
        routeResolver.resolveControllerRoutes(metaType);

        // then
        expect(applicationServer.registerRoute).toBeCalledTimes(1)
        expect(applicationServer.registerRoute).toBeCalledWith({path: '/', method: HttpMethod.GET, handler: metadata[0]})
    });
});
