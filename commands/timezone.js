const moment = require('moment-timezone');

const showTimeZones = (msg, prefix) => {
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

module.exports = {
  showTimeZones: showTimeZones
}