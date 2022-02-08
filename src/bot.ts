// Run dotenv
require('dotenv').config();

import "reflect-metadata";
import { Client } from "discordx";
import { Intents } from "discord.js";

import message = require('./services/message');
import stateUpdate = require('./services/stateUpdate');

//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`);
});

//User messages
client.on('messageCreate', msg => {
    message.execute(msg);
});

//User enter or leave voice channel 
client.on('voiceStateUpdate', (oldState, newState) => {
    stateUpdate.execute(client,oldState,newState);
})


client.login(process.env.DISCORD_TOKEN!);
