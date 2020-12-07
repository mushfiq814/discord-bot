
// filesystem
const fs = require('fs');
// moment for date-time
const moment = require('moment-timezone');

const timezoneLookup = {
  'AEST': 'Australia/Melbourne',
  'AEDT': 'Australia/Melbourne',
  'EST': 'America/New_York',
  'EDT': 'America/New_York',
  'PST': 'America/Los_Angeles',
  'PDT': 'America/Los_Angeles',
  'BDT': 'Asia/Dhaka',
  'BST': 'Asia/Dhaka',
  'CET': 'Europe/Berlin',
  'CEST': 'Europe/Berlin', // germany
}

let savedTimeZones = [
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Dhaka',
  'Australia/Melbourne',
  'Europe/Berlin',
]

savedTimeZones.forEach(zone => console.log(zone, moment('2020-05-12T19:00:00').tz(zone).format('LLL')))

/**
 * Time formats for .format()
 * 'L'    -> 05/11/2020
 * 'LL'   -> May 11, 2020
 * 'LLL'  -> May 11, 2020 1:25 PM
 * 'LLLL' -> Monday, May 11, 2020 1:25 PM
 */