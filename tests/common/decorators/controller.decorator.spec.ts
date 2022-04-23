import {Controller} from "@common/decorators/controller.decorator";
import {Reflector} from "@utils/reflector";
import {ComponentType} from "@common/type/component-type";

describe('@Controller', () => {

    it('should contains path and type metadata keys when is defined', () => {
        // given
        @Controller()
        class ExampleController {}

        // when
        const metadataKeys = Reflector.getMetadataKeys(ExampleController)

        // then
        expect(metadataKeys).toContain("path")
        expect(metadataKeys).toContain("type")
    })

    it('should reflect path metadata with default value when is not declared', () => {
        // given
        @Controller()
        class ExampleController {}

        // when
        const path = Reflector.getMetadata<String>(ExampleController, "path");

        // then
        expect(path).toBe("/")
    })

    it('should reflect path metadata with value when is given', () => {
        // given
        @Controller("/example")
        class ExampleController {}

        // when
        const path = Reflector.getMetadata<String>(ExampleController, "path");

        // then
        expect(path).toBe("/example")
    })

    it('should reflect component type metadata with Controller', () => {
        // given
        @Controller()
        class ExampleController {}

        // when
        const type = Reflector.getMetadata<ComponentType>(ExampleController, "type");

        // then
        expect(type).toBe(ComponentType.CONTROLLER)
    })
})
