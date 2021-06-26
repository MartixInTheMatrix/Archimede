const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;
  const warns = JSON.parse(fs.readFileSync("../database/warns.json", "utf8"))

  let fs = require('fs')
  if(lang === "fr") {
    let user = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!user) return message.reply("Je ne peux pas trouver cet utilisateur...");
    if(!warns[user.id]) warns[user.id] = {
      warns: 0
    };

    const wembed = new discord.MessageEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .addField('Action:', 'Warn Check')
    .addField('Utilisateur:', `${user.username}#${user.discriminator}`)
    .addField('Nombre de warns:', warns[`${user.id}`].warns)
    message.channel.send(wembed);
  }else if(lang === "en"){
    let user = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!user) return message.reply("i can\'t find this user...");
    if(!warns[user.id]) warns[user.id] = {
      warns: 0
    };

    const wembed = new discord.MessageEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .addField('Action:', 'Warn Check')
    .addField('User:', `${user.username}#${user.discriminator}`)
    .addField('Number of warns:', warns[`${user.id}`].warns)
    message.channel.send(wembed);
  }
}

module.exports.help = {
    name: 'infowarn',
    description:"donne des informations sur les warns de quelqu'un <infowarn> <mention>"
  }