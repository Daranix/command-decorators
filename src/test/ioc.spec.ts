import { DefaultIocContainer } from "../utils/defaultioccontainer";

describe("Check IoC default container", () => {

    class TestClass {
        helloWorld(): string {
            return "Hello world";
        }
    }

    const TEST_ID = 'TestId';

    const container = new DefaultIocContainer();
    
    it(`Should create new entry on map container of test class by id: ${TEST_ID}`, () => {
        container.bind(TestClass, TEST_ID);
        expect(container.mapContainer.has(TEST_ID)).toBeTruthy();
    });

    it(`Should create new entry on map container of test class by type: TestClass`, () => {
        container.bind(TestClass, TestClass);
        expect(container.mapContainer.has(TestClass)).toBeTruthy();
    });

    it(`Should fail when trying to add a new binding with same Id: ${TEST_ID}`, () => {
        const t = () => container.bind(TestClass, TEST_ID);
        expect(t).toThrow(Error);
    });

    it(`Should fail when trying to get a instance from the container which doesn't exists`, () => {
        const t = () => container.get<Object>('ThisIdDoesntExists');
        expect(t).toThrow(Error);
    });


});
