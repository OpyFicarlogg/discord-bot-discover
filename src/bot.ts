// Run dotenv
require('dotenv').config();

import "reflect-metadata";
import { Client } from "discordx";
import { Intents } from "discord.js";

import { myContainer } from "./config/inversify.config";
import { TYPES } from "./config/types";
import { ICustomMessage } from "./services/interfaces/ICustomMessage";
import { ICustomStateUpdate } from "./services/interfaces/ICustomStateUpdate";

//Dependency injection 
const customMessage : ICustomMessage = myContainer.get<ICustomMessage>(TYPES.ICustomMessage);
const customStateUpdate : ICustomStateUpdate = myContainer.get<ICustomStateUpdate>(TYPES.ICustomStateUpdate);

//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`);
});

//User messages
client.on('messageCreate', msg => {
    customMessage.execute(msg);
});

//User enter or leave voice channel 
client.on('voiceStateUpdate', (oldState, newState) => {
    customStateUpdate.execute(client,oldState,newState);
})


client.login(process.env.DISCORD_TOKEN!);
