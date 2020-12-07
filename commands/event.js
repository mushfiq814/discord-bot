const fs = require('fs');
const { localStorage } = require('../config/config.json');

const addEvent = (msg, prefix) => {
  const msgStartIndex = (prefix + 'addEvent ').length;
  const event = msg.content.substring(msgStartIndex).split(" ");
  const title = event[0];
  event.shift();
  const start = event.join(" ");

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

module.exports = {
  addEvent: addEvent
}