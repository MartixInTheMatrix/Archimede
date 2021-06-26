const Discord = require('discord.js');
const ms = require('ms');
const path = require('path');
const fs = require('fs');
const db = require('quick.db');
const leveling = require('discord-leveling')

module.exports.run = async (client, message, args) => {
if (message.mentions.users.first()) {
 
    var output = await leveling.Leaderboard({
      search: message.mentions.members.first().id
    })
    message.channel.send(
        new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`L'utilisateur ${user.displayName} est ${output.placement} dans le leaderboard!`)
    )
    //Searches for the top 3 and outputs it to the user.
  } else {

    leveling.Leaderboard({
      limit: 3 //Only takes top 3 ( Totally Optional )
    }).then(async uz => { //make sure it is async

      if (uz[0]) var firstplace = await client.users.fetch(uz[0].userid) //Searches for the user object in discord for first place
      if (uz[1]) var secondplace = await client.users.fetch(uz[1].userid) //Searches for the user object in discord for second place
      if (uz[2]) var thirdplace = await client.users.fetch(uz[2].userid) //Searches for the user object in discord for third place

      message.channel.send(
          new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setTitle(`Leaderboard`)
        .setDescription(
        `> <:fun:792810153849651211> 1er - ${firstplace && firstplace.tag || 'Personne'} | ${uz[0] && uz[0].level + ' level'|| 'pas de level'} 
        \n> 👏 2eme - ${secondplace && secondplace.tag || 'Personne'} | ${uz[1] && uz[1].level + ' level'|| 'pas de level'} 
        \n> 😀 3eme - ${thirdplace && thirdplace.tag || 'Personne'} | ${uz[2] && uz[2].level + ' level'|| 'pas de level'} `)
      )
    })

  }
}

module.exports.help = {
    name: "leaderboard"
  }