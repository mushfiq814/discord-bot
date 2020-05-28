// discord js
const Discord = require('discord.js');
const bot = new Discord.Client();
// env vars
const { prefix, token } = require('./config.json');
// commands
const tz = require('./commands/timezone');
const lk = require('./commands/link');
const ev = require('./commands/event');

// login
bot.login(token);
console.log("Ze bot is alive...");

// message handling
bot.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}hi`)) msg.channel.send(`Hi ${msg.author.tag}`);
  if (msg.content.startsWith(`${prefix}help`)) showHelp(msg);
  if (msg.content.startsWith(`${prefix}time`)) msg.channel.send(`the current time is ${new Date()}`);
  if (msg.content.startsWith(`${prefix}getLink`)) lk.getLink(msg, prefix);
  if (msg.content.startsWith(`${prefix}addLink`)) lk.addLink(msg, prefix);
  if (msg.content.startsWith(`${prefix}addEvent`)) ev.addEvent(msg, prefix);
  if (msg.content.startsWith(`${prefix}tz`)) tz.showTimeZones(msg, prefix);
});

// command list
const commands = [
  {
    'name': 'hi',
    'desc': 'say hello',
  },
  {
    'name': 'time',
    'desc': 'get the current time',
  },
  {
    'name': 'getLink',
    'desc': 'retrieve a stored bookmark',
  },
  {
    'name': 'addLink',
    'desc': 'add a new URL to bookmark',
  },
  // {
  //   'name': 'addEvent',
  //   'desc': 'add new event list',
  // },
  {
    'name': 'tz',
    'desc': 'get provided time in different stored timezones. Support for adding new timezones coming soon! Note: provided time should be in Eastern Time for now.',
  },
]

// commands
const showHelp = (msg) => {
  let res = `Hello! I am Nurul Islam bot. Check out my code on github: https://github.com/mushfiq814/discord-bot\n`;
  res += `These are the following commands I can respond to. Just type one of these in and watch me roll!\n\n`;
  commands.forEach(cmd => res += `**!${cmd.name}**: ${cmd.desc}\n`);
  msg.channel.send(res);
}
