const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')

module.exports.run = async (client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
message.channel.send(
  new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("<:quest:795259585480753175> Resultat de votre recherche :")
  .setDescription(`[Clique ici](https://www.youtube.com/results?search_query=${message.content.split(" ").slice(1)})`)
  )
  }else if(lang === "en"){
    message.channel.send(
      new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("<:quest:795259585480753175> Result of your search :")
      .setDescription(`[Click here](https://www.youtube.com/results?search_query=${message.content.split(" ").slice(1)})`)
      )
  }
}
module.exports.help = {
    name: 'search'
  }