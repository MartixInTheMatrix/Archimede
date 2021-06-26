const discord = require('discord.js');
const path = require('path')
const superagent = require('superagent')

module.exports.run = async(client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;
const fights = require('../database/fights.json');
      const membre = message.mentions.users.first();
  const teamRandom = [`${membre.username} a gagné`, `${message.author} a gagné`];
    let math = Math.floor(Math.random() * teamRandom.length);
      message.channel.send(`${message.author} est en train de combattre ${message.mentions.users.first()} ${fights[Math.floor(Math.random() * fights.length)]}`)
        message.channel.send(`> ${teamRandom[math]}`)
}
module.exports.help = {
    name: 'fight'
}