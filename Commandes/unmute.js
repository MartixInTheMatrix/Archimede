const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
    const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
    if (!mutedRole)
     return message.channel.send(
      new discord.MessageEmbed()
      .setTitle("<:x_:792807799344070676> Role invalide ")
      .setColor('RED')
      .setDescription("Il n'y a pas de role `Muted` sur ce serveur")
      );
     const target = message.mentions.members.first()
     target.roles.remove(mutedRole);
     const unmuteembed = new discord.MessageEmbed()
     .setColor("GREEN")
     .setTitle('<:antiraid:792807862283665439> Membre Demuté')
     .setThumbnail(target.user.displayAvatarURL())
     .addField('Utilisateur Demuté ', target.user.username)
     .addField('Demuté par ', message.author)
     .setFooter('Avatar du Demuté ', target.user.displayAvatarURL())
     .setTimestamp()
     message.channel.send(unmuteembed);
  target.send(`Tu es maintenant maintenant demute sur le serveur **${message.guild.name}**`)
  }else if(lang === "en"){
    const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
    if (!mutedRole)
     return message.channel.send(
      new discord.MessageEmbed()
      .setTitle("<:x_:792807799344070676> Invalid role ! ")
      .setColor('RED')
      .setDescription("There isn't role named `Muted` in this guild")
     );
     const target = message.mentions.members.first()
     target.roles.remove(mutedRole);
     const unmuteembed = new discord.MessageEmbed()
     .setColor("GREEN")
     .setTitle('<:antiraid:792807862283665439> Unmuted Member')
     .setThumbnail(target.user.displayAvatarURL())
     .addField('Unmuted User ', target.user.username)
     .addField('Unmuted by ', message.author)
     .setFooter('Avatar of the unmuted ', target.user.displayAvatarURL())
     .setTimestamp()
     message.channel.send(unmuteembed);
  target.send(`You are now unmuted on the server **${message.guild.name}**`)
  }
}
module.exports.help = {
    name: 'unmute',
    description: `Ne plus rendre muet quelqu'un sur le serveur <unmute> <mention>`
  }