const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix, token} = require('./config.json');

// login
bot.login(token);

// message handling
bot.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}hi`)) msg.channel.send(`Hi ${msg.author.tag}`);
  if (msg.content.startsWith(`${prefix}time`)) msg.channel.send(`the current time is ${new Date()}`);
});