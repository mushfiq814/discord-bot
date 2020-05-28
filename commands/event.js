const fs = require('fs');
const { localStorage } = require('../config.json');

const addEvent = (msg, prefix) => {
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

module.exports = {
  addEvent: addEvent
}