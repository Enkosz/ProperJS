import {Component} from "@common/decorators/component.decorator";
import {Reflector} from "@utils/reflector";
import {ComponentType} from "@common/type/component-type";

describe("@Component", () => {

    it('should contains type metadata key when defined', () => {
        // given
        @Component()
        class ExampleComponent {}

        // when
        const metadata = Reflector.getMetadataKeys(ExampleComponent);

        // then
        expect(metadata).toContain("type")
    })

    it("should reflect component type metadata with Component", () => {
        // given
        @Component()
        class ExampleComponent {}

        // when
        const type = Reflector.getMetadata<ComponentType>(ExampleComponent, "type");

        // then
        expect(type).toBe(ComponentType.COMPONENT)
    })
})
