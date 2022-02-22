// Run dotenv
require('dotenv').config();

import "reflect-metadata";
import { Client } from "discordx";
import { Intents } from "discord.js";

import { myContainer } from "./config/inversify.config";
import { TYPES } from "./config/types";

import { ICustomStateUpdate } from "./services/stateUpdate/interfaces/ICustomStateUpdate";
import { Command } from "./services/commands/interfaces/command";
import { Loader } from "./services/loader";
import { CustomMessage } from "./services/messages/interfaces/customMessage";

//Dependency injection 
//const customMessage : ICustomMessage = myContainer.get<ICustomMessage>(TYPES.ICustomMessage);
const customStateUpdate : ICustomStateUpdate = myContainer.get<ICustomStateUpdate>(TYPES.ICustomStateUpdate);
const loader = myContainer.get<Loader>(Loader);
//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

let commands = new Map<string,Command>();

let messages = new Map<string,CustomMessage>();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user!.tag}!`);

	commands = loader.loadCommands();
	messages = loader.loadMessages();

	//define onload on application 
	/*let command = client.application!.commands;
	command.create({
		name:'ping',
		description:'reply with pong'
	})*/
});

client.on('interactionCreate', async interaction => {
	console.log(interaction)
	if (!interaction.isCommand()) return;

	if(commands.get(interaction.commandName)){
		commands.get(interaction.commandName)?.execute(client,interaction);
	}
});

//User messages
client.on('messageCreate', msg => {
	let prefix = '!';
	if(msg.content.indexOf(prefix)!= -1){
		let command =  msg.content.replace(prefix, '');
		if(messages.get(command)){
			messages.get(command)?.execute(client,msg);
		}
	}
});

//User enter or leave voice channel 
client.on('voiceStateUpdate', (oldState, newState) => {
	//TODO: load dynamicly
    customStateUpdate.execute(client,oldState,newState);
})


client.login(process.env.DISCORD_TOKEN!);
