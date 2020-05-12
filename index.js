
// filesystem
const fs = require('fs');
// discord js
const Discord = require('discord.js');
const bot = new Discord.Client();
// env vars
const { prefix, token, localStorage } = require('./config.json');
// moment for date-time
const moment = require('moment-timezone');

// login
bot.login(token);
console.log("Ze bot is alive...");

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
  {
    'name': 'addEvent',
    'desc': 'add new event list',
  },
  {
    'name': 'tz',
    'desc': 'get provided time in different stored timezones. Support for adding new timezones coming soon!',
  },
]

// message handling
bot.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}hi`)) msg.channel.send(`Hi ${msg.author.tag}`);
  if (msg.content.startsWith(`${prefix}help`)) showHelp(msg);
  if (msg.content.startsWith(`${prefix}time`)) msg.channel.send(`the current time is ${new Date()}`);
  if (msg.content.startsWith(`${prefix}getLink`)) getLink(msg);
  if (msg.content.startsWith(`${prefix}addLink`)) addLink(msg);
  if (msg.content.startsWith(`${prefix}addEvent`)) addEvent(msg);
  if (msg.content.startsWith(`${prefix}tz`)) showTimeZones(msg);
});

// commands
const showHelp = (msg) => {
  let res = `Hi! I am Mushfiq's test bot. Check out my code on github: https://github.com/mushfiq814/discord-bot\n`;
  res += `These are the following commands I can respond to. Just type one of these in and watch me roll!\n\n`;
  commands.forEach(cmd => res += `**!${cmd.name}**: ${cmd.desc}\n`);
  msg.channel.send(res);
}

const addEvent = (msg) => {
  const titleStartIndex = (prefix + 'addEvent ').length;
  let title = msg.content.substring(titleStartIndex);

  let toWrite = {
    "title": title
  };
  
  let data = fs.readFileSync(localStorage);
  let dataJson = JSON.parse(data);
  dataJson.events.push(toWrite);
  fs.writeFileSync(localStorage, "\n" + JSON.stringify(dataJson), (e) => {
    if (e) throw e;
  });
  msg.channel.send(`New Event "${title}" created`);
}

const addLink = (msg) => {
  const linkStartIndex = (prefix + 'addLink ').length;
  let link = msg.content.substring(linkStartIndex);

  let arr = link.split(" ",);
  let linkName = arr.splice(0,arr.length-1);
  let linkAddr = arr;
  linkName = linkName.join(" ");
  linkAddr = linkAddr.join();

  let toWrite = {
    "name": linkName,
    "url": linkAddr
  };
  
  let data = fs.readFileSync(localStorage);
  let dataJson = JSON.parse(data);
  dataJson.links.push(toWrite);
  fs.writeFileSync(localStorage, "\n" + JSON.stringify(dataJson), (e) => {
    if (e) throw e;
  });
  msg.channel.send(`Saved: ${linkName} with url ${linkAddr}`);
}

const getLink = (msg) => {
  const linkStartIndex = (prefix + 'getLink ').length;
  let link = msg.content.substring(linkStartIndex);

  let data = fs.readFileSync(localStorage);
  let dataJson = JSON.parse(data);
  let linkAddr = dataJson.links.filter(item => item.name == link);

  if (linkAddr.length > 0) msg.channel.send(`You requested link for ${link}. I found this: ${linkAddr[0].url}`);
  else msg.channel.send(`No links exist for ${link}`);
}

const showTimeZones = (msg) => {
  const dateStartIndex = (prefix + 'tz ').length;
  let dateStr = msg.content.substring(dateStartIndex);

  let res = `Requested dates for ${dateStr} EDT\n`;
  try {
    let date = (new Date(dateStr)).toISOString();
    let savedTimeZones = [
      'America/New_York',
      'America/Los_Angeles',
      'Asia/Dhaka',
      'Australia/Melbourne',
      'Europe/Berlin',
    ]
    res += '```';
    savedTimeZones.forEach(zone => res += `${zone.padEnd(25, ' ')}${moment(date).tz(zone).format('LLL')}\n`)
    res += '```';
  } catch(e) {
    res = 'Please enter date time in M/D/YYYY H:mm ampm format';
  }

  msg.channel.send(res);
}