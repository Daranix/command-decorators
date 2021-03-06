import { CommandManager } from "../manager";
import { CommandCategory, Command } from "../decorators";
import { ICategory, ICommand } from "../interfaces";

describe("Generate basic command and category", () => {

    const TEST_CATEGORY_NAME = "TestCategory";
    const TEST_COMMAND_NAME = "helloWorld";


    // --- Setup ---
    @CommandCategory({ name: TEST_CATEGORY_NAME, description: "TestCategory" })
    class Prueba {

        testVar = 'test';

        @Command(TEST_COMMAND_NAME)
        public sayHello() {
            console.log("Context: " + this.testVar);
            console.log("Command OUTPUT TEST ");
        }
    }

    it(`Should try to execute the command but should fail beacuse the class is not registered in the IoC`, () => {
        const t = () => CommandManager.runCommand(TEST_COMMAND_NAME, ...[]);
        expect(t).toThrow(Error);
    })

    CommandManager.setupCategoryClasses(
        Prueba
    );

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
        const t = () => CommandManager.runCommand(TEST_COMMAND_NAME, ...[]);
        expect(t).not.toThrow(Error);
    });

    it(`Should fail if the command doesn't exists`, () => {
        const t = () => CommandManager.runCommand('ThisCommandDoesntExists', ...[]);
        expect(t).toThrow(Error);
    });

    it(`Should fail beacuse the command is already registered`, () => {
        const cmdData = CommandManager.commands.get(TEST_COMMAND_NAME) as ICommand;        
        const t = () => CommandManager.registerCommand(TEST_COMMAND_NAME, cmdData);
        expect(t).toThrow(Error);
    });


});
