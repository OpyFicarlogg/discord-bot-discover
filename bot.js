// Run dotenv
require('dotenv').config();

const fileUser = require('./fileUser');
const { Client, Intents } = require('discord.js');
//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    console.log(msg.guild.id);

    //Permet d'ajouter un user à notifier 
    if (msg.content === '!notifyme') {
        // Ajouter au fichier 
        fileUser.addUser(msg.guild.id, msg.author);
        console.log(`Notifications activées pour ${msg.author}`);
        //Réponse au message 
        msg.reply(`Notifications activées pour ${msg.author}`);
    }
    //Envoyer un mp avec le nombre d'user et les user
    //Définir sur quel user on souhaite être notifié ? 

    //TODO: prévoir une méthode !stopnotifyme

    //TODO: prévoir une méthode !help

    //Test simple de réponse du bot 
    if (msg.content === '!ping') {
        msg.reply('pong!')
            .then(message => console.log(`Reply pong to: ${user.username}`))
            .catch(console.error);
    }
    
});


client.on('voiceStateUpdate', (oldState, newState) => {
    
    // check for bot
    if (oldState.member.user.bot) return;

    //Récupération des channels
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
  
    // User Joins a voice channel
    if(oldUserChannel === null && newUserChannel !== undefined) {

        //TODO: detecter uniquement si un nouveau user arrive 
        // Ne pas notifier tant que le count n'est pas supérieur au max ? 
        // Notifier uniquement quand passage de 0 à +0 ? 
        // Limiter la notification tous les X ? 

        console.log(`Nouvel utilisateur connecté: ${newState.member.user.username}`);

        //Récupération de la liste des id de user à notifier 
        var users = fileUser.getUsers(newState.guild.id);
    
        //Récupération de l'objet User et send de la notification
        users.forEach( user => 
            client.users.fetch(user.id).then((discordUser) => {
                console.log(`Notification envoyé à ${discordUser.username}`);
                discordUser.send(`${newState.channel.members.size} dans le channel ${newUserChannel.name}`);
            }).catch(console.error)
        );
        
        
  
    } else if(newUserChannel === null){
        // User leaves a voice channel
      return;
    }
})

client.login(process.env.DISCORD_TOKEN);
