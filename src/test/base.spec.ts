import { CommandManager } from "../manager";
import { CommandCategory, Command, CmdParam } from "../decorators";
import { ICategory, ICommand } from "../interfaces";
import { CmdError } from "../cmderror";
import 'reflect-metadata';

describe("Generate basic command and category", () => {

    const TEST_CATEGORY_NAME = "TestCategory";
    const TEST_COMMAND_NAME = "helloWorld";
    const TEST_COMMAND_WITH_PARAMS = "cmdwithparams";


    // --- Setup ---
    @CommandCategory({ name: TEST_CATEGORY_NAME, description: "TestCategory" })
    class Prueba {

        testVar = 'test';

        @Command(TEST_COMMAND_NAME)
        public sayHello() {
            console.log(`Context: ${this.testVar}`);
            console.log("Command OUTPUT TEST ");
        }

        @Command(TEST_COMMAND_WITH_PARAMS)
        public cmdWithParams(@CmdParam() param: number) {
            
        }
    }

    const IOC_ID_TestClass = 'IocTestClass';
    @CommandCategory({ name: 'IocIntegrationTest', description: "Category for test the integration with IoC contrainers", iocIdentifier: IOC_ID_TestClass})
    class IocTestClass {

        @Command('IocTest')
        public sayHello() {
            console.log('Hello from Ioc Test class');
        }
    }

    CommandManager.setupCategoryClasses(
        Prueba,
        IocTestClass
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

    /*
    it(`Should fail if the command doesn't exists`, () => {
        const t = () => CommandManager.runCommand('ThisCommandDoesntExists', ...[]);
        expect(t).toThrow();
    });*/

    it(`Should fail beacuse the command is already registered`, () => {
        const cmdData = CommandManager.commands.get(TEST_COMMAND_NAME) as ICommand;        
        const t = () => CommandManager.registerCommand(TEST_COMMAND_NAME, cmdData);
        expect(t).toThrow();
    });

    it(`Should have registered a command with the IoC identifier: ${IOC_ID_TestClass}`, () => {
        expect(CommandManager.iocContainer.get(IOC_ID_TestClass)).toBeTruthy();
    });

    it(`Should fail when trying to run command without the required params`, () => {
        const t = () => CommandManager.runCommand(TEST_COMMAND_WITH_PARAMS, ...[]);
        expect(t).rejects.toThrow();
    });

    it(`Shoud fail when run a command with a parameter which can't be parsed as the required type`, async () => {
        const t = () => CommandManager.runCommand(TEST_COMMAND_WITH_PARAMS, ...['potatoe'])
        expect(t).rejects.toThrow();
    })

});
