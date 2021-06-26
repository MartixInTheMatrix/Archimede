const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message, args) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

if(lang === "fr "){
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Tu ne peux pas utiliser ca!')
    .setColor('RED')
    )
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Tu n\' a pas les perms suffisantes')
    .setColor('RED')
  )
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if(!args[0]) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Veuillez mentionner un utilisateur')
    .setColor('RED')
    );
  
  if(!member) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Je n\'arrive pas a detecter l`utilisateur, desole')
    .setColor('RED')
    );
  if(!member.bannable) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Cet utilisateur ne peut pes etre banni. Il a surement les permissions administrateur ou il a un role plus haut que moi')
    .setColor('RED')
    );
  
  if(member.id === message.author.id) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle('Bruh, tu ne peux pas te ban tout seul !')
    .setColor('RED')
  )
  
  let reason = args.slice(1).join(" ");
  
  if(!reason) reason = 'Non specifié';
  
  member.ban({ days: 7, reason: 'Ta raison' }).catch(err => { 
    message.channel.send(
      new discord.MessageEmbed()
      .setTitle('Une erreur est survenue !')
      .setColor('RED')
    )
      console.log(err)
  })

  const banembed = new discord.MessageEmbed()
  .setColor("#2f3136")
  .setTitle('<:moderator:792809429300281355>  ❱ Membre Banni')
  .setThumbnail(member.user.displayAvatarURL())
  .addField('Utilisateur ban ', member)
  .addField('Ban par ', message.author)
  .addField('Raison ', reason)
  .setFooter('Avatar du banni ', member.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(banembed)

}else if(lang === "en"){
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that !')
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('You don\'t have the rights permissions.')
  
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if(!args[0]) return message.channel.send('Please mention someone');
  
  if(!member) return message.channel.send('I cannot detect the user, sorry');
  if(!member.bannable) return message.channel.send('This user cannot be banned. He probably has administrator permissions or he has a higher role than me.');
  
  if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself on your own!');
  
  let reason = args.slice(1).join(" ");
  
  if(!reason) reason = 'No specify';
  
  member.ban({ days: 7, reason: 'Your reason' }).catch(err => { 
    message.channel.send('there is something wrong ')
      console.log(err)
  })

  const banembed = new discord.MessageEmbed()
  .setColor("#2f3136")
  .setTitle('<:moderator:792809429300281355>  ❱ Member Banned')
  .setThumbnail(member.user.displayAvatarURL())
  .addField('User baned ', member)
  .addField('Baned by ', message.author)
  .addField('Reason ', reason)
  .setFooter('Avatar of the banned ', member.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(banembed)

}
}
module.exports.help = {
    name: 'ban',
    description:"ban quelqu'un <ban> <mention> <raison>"
  }