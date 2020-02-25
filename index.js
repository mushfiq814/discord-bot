
const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix, token, localStorage} = require('./config.json');
const fs = require('fs');

// login
bot.login(token);
console.log("Ze bot is alive...");

// message handling
bot.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}hi`)) msg.channel.send(`Hi ${msg.author.tag}`);
  if (msg.content.startsWith(`${prefix}time`)) msg.channel.send(`the current time is ${new Date()}`);
  if (msg.content.startsWith(`${prefix}getLink`)) getLink(msg);
  if (msg.content.startsWith(`${prefix}addLink`)) addLink(msg);
  if (msg.content.startsWith(`${prefix}addEvent`)) addEvent(msg);
});

let addEvent = (msg) => {
  let titleStartIndex = (prefix + 'addEvent ').length;
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

let addLink = (msg) => {
  console.log("Add link started");

  let linkStartIndex = (prefix + 'addLink ').length;
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

let getLink = (msg) => {
  console.log("Read link started");

  let linkStartIndex = (prefix + 'getLink ').length;
  let link = msg.content.substring(linkStartIndex);

  let data = fs.readFileSync(localStorage);
  let dataJson = JSON.parse(data);
  let linkAddr = dataJson.links.filter(item => item.name == link);

  if (linkAddr.length > 0) msg.channel.send(`You requested link for ${link}. I found this: ${linkAddr[0].url}`);
  else msg.channel.send(`No links exist for ${link}`);
}