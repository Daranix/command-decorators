import { CommandManager } from "../manager";
import { CommandCategory, Command } from "../decorators";
import { ICategory } from "../interfaces";

describe("Generate basic command and category", () => {

    const TEST_CATEGORY_NAME = "TestCategory";
    const TEST_COMMAND_NAME = "helloWorld";

    @CommandCategory({ name: TEST_CATEGORY_NAME, description: "TestCategory" })
    class Prueba {
        @Command(TEST_COMMAND_NAME)
        public sayHello() { console.log("Command OUTPUT TEST "); }
    }

    it(`Should have a command registered with the name ${TEST_COMMAND_NAME}`, () => {
        expect(CommandManager.commands.has(TEST_COMMAND_NAME)).toBeTruthy();
    });

    it(`Should have registered a category with name: ${TEST_CATEGORY_NAME}`, () => {
        const cat = CommandManager.categories.get(TEST_CATEGORY_NAME);
        expect(cat).toBeTruthy();
    });

    it(`Should have a command with name: ${TEST_COMMAND_NAME} registered inside the category with name: ${TEST_COMMAND_NAME}`, () => {
        const category = CommandManager.categories.get(TEST_CATEGORY_NAME) as ICategory;
        expect(category.commands.has(TEST_COMMAND_NAME)).toBeTruthy();
    });

    it(`Should run correctly the command without parameters: ${TEST_COMMAND_NAME}`, () => {
        CommandManager.runCommand(TEST_COMMAND_NAME, ...[]);
    });
});
