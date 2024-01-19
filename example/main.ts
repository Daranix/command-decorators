import { createInterface } from "readline";
import { CommandManager } from "../src/manager"; 
import { Command, CommandCategory, CmdParam } from "../src";
import 'reflect-metadata';


const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    console.log("Hello this is the example of command handler, here's the command avaiable list:")

    CommandManager.setupCategoryClasses(
        TestCommands
    )

    for (const category of CommandManager.categories.values()) {
        console.log(`- ${category.name}`)
        for (const command of category.commands.values()) {
            console.log(`\t- /${command.command} \n\t${command.parameters.map((p) => `\n\t\t[${p.name}] - ${p.customType} - ${p.description}`)}`)
        }
    }

    promptLoop();

}

function promptLoop() {
    readline.question(`> `, async (input: string) => {
        await handleMessage(input);
        promptLoop();
    });
}

async function handleMessage(input: string) {
    // Command parser

    const args = input.match(/('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g) || [];
    for(let i=1;i<args.length;i++)
    {
        if( args[i].substring(0, 1) === '"' || args[i].substring(0,1) === "'" ) {
            args[i] = JSON.parse(args[i]);
        }
    }

    // Let's check if this crazy thing ever happens.
    if (args.length === 0) {
        throw "This should NEVER happen.";
    }
    const commandName = args.splice(0, 1)[0].slice(1);

    
    const result = await CommandManager.runCommand(commandName, ...args);
    console.log(`Hi ${result}!`);
}

@CommandCategory({ name: 'Test', description: 'Test commands' })
class TestCommands {
    @Command('hello')
    public hello(@CmdParam({ description: 'any text' }) text: string) {
        return text;
    }
}

main();