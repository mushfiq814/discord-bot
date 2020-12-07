const fs = require('fs');
const { localStorage } = require('../config/config.json');

// get a saved link
const getLink = (msg, prefix) => {
  const linkStartIndex = (prefix + 'getLink ').length;
  let link = msg.content.substring(linkStartIndex);

  let data = fs.readFileSync(localStorage);
  let dataJson = JSON.parse(data);
  let linkAddr = dataJson.links.filter(item => item.name == link);

  if (linkAddr.length > 0) msg.channel.send(`You requested link for ${link}. I found this: ${linkAddr[0].url}`);
  else msg.channel.send(`No links exist for ${link}`);
}

// add a link
const addLink = (msg, prefix) => {
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

module.exports = {
  getLink: getLink,
  addLink: addLink,
}