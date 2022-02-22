//Allow to register commands to discord api. 
//Dynamic load from discord doc https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files

//Delete all slash commands : https://stackoverflow.com/questions/70167100/discord-js-v13-slash-commands-are-duplicated

require('dotenv').config();
import "reflect-metadata";
import { myContainer } from "./config/inversify.config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Loader } from "./services/loader";

const loader = myContainer.get<Loader>(Loader);

setTimeout(function () {
	console.log("start deploy commands");


	let commands : Array<SlashCommandBuilder> =  [];

	loader.loadCommands().forEach( (command) => {
		commands.push(command.getSlashCommand());
	})

	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

	if(process.argv.length == 3 && process.argv[2] == "local"){
		console.log("Deploy commands local");
		rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), { body: commands })
			.then(() => console.log('Successfully registered application commands locally.'))
			.catch(console.error);
		
	}
	else{
		console.log("Deploy commands global");
		rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), { body: commands })
			.then(() => console.log('Successfully registered application commands globally.'))
			.catch(console.error);
	}

}, 3000); //Timeout because aync import in mycontainer





