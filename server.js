'use strict';

// Import Twitter Comunity API
const Twit = require('twit');

// Import https api for making requests to OCRAPI
const https = require('https');

// Import the discord.js module
const Discord = require('discord.js');

const settings = require('./settings.json');

// Create an instance of a Discord client
const client = new Discord.Client();

// create an express app
const express = require("express")
const app = express()


// censor system
const censor = require('./censor');

// .env
const dotenv = require('dotenv').config()


// DO NOT LOOK HERE OKAY
var T = new Twit({
    consumer_key:         'LSu4HB9hRJlqouPn2v2clsdKh',
    consumer_secret:      '3KoDjEukaFVSrMKu6wcQlktApifaG8UW1CL8nSgRlbKKQFnd8M',
    access_token:         '1285610946900221958-I34RcImpvtqO8GRuvbMPsXZkWkDfw2',
    access_token_secret:  '0RnVgxpXXqO4dEj5ZmUCEBuErbrgpqY0qo31o3P1QexA5',
});



T.getAuth();



var bannedWords = [
  'suce',
  'merde',
  'connard',
  'connasse',
  'connasses',
  'putes',
  'pute',
  'http://',
  'https://',
  'Suce',
  'Merde',
  'Connard',
  'Connasse',
  'Connasses',
  'Putes',
  'Pute',
];

const link = /[http://, https://]/g;


client.on('ready', () => {
    console.log('Lance !');
    client.user.setActivity("*help for help"); 
});

client.on('message', message => {
  if (settings.chanids.includes(message.channel.id) && message.author.id !== "733630928005627924" && message.content.search(link) == -1) {
    console.log("Capté !")
    let evbtweet = message.content
    message.delete()
    T.post('statuses/update', { status: evbtweet }, function(err, data, response) {
      message.channel.send('Tweet envoyé ! Voici le lien direct : https://twitter.com/ectweet_/status/' + data.id_str)
      console.log(data)
    })
  }
  if (settings.chanNames.includes(message.channel.name) && message.author.id !== "733630928005627924" && message.content.search(link) == -1) {
    let evbtweet = message.content
    message.delete()
    T.post('statuses/update', { status: evbtweet }, function(err, data, response) {
      const pubEmbed = new Discord.MessageEmbed()
        .setColor('#30b008')
        .setTitle("Merci d'utiliser TwitterBot !")
        .setURL('https://ectweet.gabrielc.fr/')
        .setDescription('***Ce serveur utilise la licence gratuite.***')
        .addFields(
          { name: 'Invitez-vous aussi le bot !', value: '[Cliquez ici](https://ectweet.gabrielc.fr/invit)' },
        );
      if (Math.random() < 0.5) {
        message.channel.send(pubEmbed)
      }
      message.channel.send('Tweet envoyé ! Voici le lien direct : https://twitter.com/ectweet_/status/' + data.id_str)
      console.log(data)
    })
  }
  if (message.content.startsWith(settings.prefix + "tw") && message.content.search(link) == -1) {
    tweet = message.content.slice(4)
    message.delete()
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
      const pubEmbed = new Discord.MessageEmbed()
      .setColor('#30b008')
      .setTitle("Merci d'utiliser TwitterBot !")
      .setURL('https://ectweet.gabrielc.fr/')
      .setDescription('***Ce serveur utilise la licence gratuite.***')
      .addFields(
        { name: 'Invitez-vous aussi le bot !', value: '[Cliquez ici](https://ectweet.gabrielc.fr/invit)' },
      );
    if (Math.random() < 0.5) {
      message.channel.send(pubEmbed)
    }
    message.channel.send('***Tweet envoyé !*** Voici le lien direct : https://twitter.com/ectweet_/status/' + data.id_str)
    console.log(data)
    })
  }
  if (message.content === settings.prefix + 'stop' && message.author.id == 377786921499361283) {
    message.channel.send('Bot arrêté');
    process.exit()
  }
  if (message.content === settings.prefix + 'help') {
  const helpEmbed = new Discord.MessageEmbed()
	  .setColor('#2952E3')
    .setTitle('🦺 Help')
	  .setURL('https://ectweet.gabrielc.fr/')
	  .setAuthor('EverybodyCanTweet', 'https://i.imgur.com/fTeDZUX.png', 'https://ectweet.gabrielc.fr/')
	  .setDescription('Here will be shown all comands available for users')
	  .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/squared-sos_1f198.png')
	  .addFields(
		  { name: '** *help **', value: 'Show this embed' },
		  { name: '** *stop **', value: 'Admin command, deactivated for everyone except gcn' },
		  { name: '** *tw <message> **', value: 'Test command, deactivated for everyone' },
    )
    .setTimestamp()
	  .setFooter('Made by gcn59#3162', 'https://i.imgur.com/UMt7XvF.png', 'https://twitter.com/gcnudde59');
  message.channel.send(helpEmbed);
  }
  
});
  
  // include keepalive if you need to host it on repl.it with UptimeMonitor
  // keepAlive();

  client.login(process.env.DISCORD_TOKEN);