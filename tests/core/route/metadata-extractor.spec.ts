import MetadataExtractor from "@core/route/metadata-extractor";

describe('MetadataExtractor', () => {

    it('should extract methods from prototype when present', () => {
        // given
        class ExampleClass {
            public exampleMethod() {}
        }
        const prototype = Object.getPrototypeOf(new ExampleClass())

        // when
        const methods = MetadataExtractor.extractMetadataFromPrototype(prototype)

        // then
        expect(methods.length).toBe(1)
        expect(methods[0]).toBe(prototype['exampleMethod'])
    })

})
