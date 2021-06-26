const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!message.member.hasPermission("BAN_MEMBERS")){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERREUR')
              .setColor('DARK_RED')
              .setDescription('Il vous faut la permission `BAN_MEMBERS` pour faire cette commande.')
              .setTimestamp()
      )
    }
    
    if(!args[0]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERREUR')
              .setColor('DARK_RED')
              .setDescription('Veuillez mentionner un utilisateur ou mettre son identifiant.')
              .setTimestamp()
      )
    }
    
    if(!args[1]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERREUR')
              .setColor('DARK_RED')
              .setDescription('Veuillez entrer la duréé du bannissement en ``minutes``.')
              .setTimestamp()
      )
    }
    
    if(!args[2]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERREUR')
              .setColor('DARK_RED')
              .setDescription('Veuillez entrer la raison du bannissement.')
              .setTimestamp()
      )
    }
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    
    await user.send(
      new discord.MessageEmbed()
          .setTitle('ATTENTION')
          .setColor('DARK_RED')
          .setDescription(`Vous avez été bannis du serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${args[1]} minute(s)`)
          .setTimestamp()
    )
    await user.ban()
    message.channel.send(
      new discord.MessageEmbed()
          .setTitle('SUCCÈS')
          .setColor('GREEN')
          .setDescription(`L'utilisateur avec pour identifiant \`\`${user.id}\`\` à correctement été bannis du serveur.\n\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${ms(ms(args[1]))} minute(s)`)
          .setTimestamp()
    )
    
      logch.send(
          new discord.MessageEmbed()
              .setTitle("TempBan | " + user.displayName)
              .addField('Modérateur', message.author, true)
              .addField('Raison', args.slice(1).join(' '), true)
              .setTimestamp()
              .setColor('DARK_RED')
      )
    
    setTimeout(function () {
      try {
          message.guild.members.unban(user, {reason: "Unban Automatique"})
          message.channel.send(
              new discord.MessageEmbed()
                  .setTitle('SUCCÈS')
                  .setColor('GREEN')
                  .setDescription(`L'utilisateur avec pour identifiant \`\`${user}\`\` à correctement été débannis du serveur après ses \`\`${ms(ms(args[1])).replace("s", " secondes").replace("m", " minutes").replace("h", " heures").replace("d", " jours")}\`\` de ban.`)
                  .setTimestamp()
          )
      } catch(e){
          console.log(e.message)
      }
    }, ms(args[1]))
  }else if(lang === "en"){
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!message.member.hasPermission("BAN_MEMBERS")){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERROR')
              .setColor('DARK_RED')
              .setDescription('You the ``BAN_MEMBERS`` permission to do this.')
              .setTimestamp()
      )
    }
    
    if(!args[0]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERROR')
              .setColor('DARK_RED')
              .setDescription('Please mention an user or his ID.')
              .setTimestamp()
      )
    }
    
    if(!args[1]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERROR')
              .setColor('DARK_RED')
              .setDescription('Please enter the duration of the ban in `` minutes``.')
              .setTimestamp()
      )
    }
    
    if(!args[2]){
      return message.channel.send(
          new discord.MessageEmbed()
              .setTitle('ERROR')
              .setColor('DARK_RED')
              .setDescription('Please enter the reason for the ban.')
              .setTimestamp()
      )
    }
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    
    await user.send(
      new discord.MessageEmbed()
          .setTitle('WARNING')
          .setColor('DARK_RED')
          .setDescription(`You was banned of the server \`\`${message.guild.name}\`\`.\n\n**Moderator :** ${message.author}\n**Reason :** ${args.slice(2).join(' ')}\n**Duration :** ${args[1]} minute(s)`)
          .setTimestamp()
    )
    await user.ban()
    message.channel.send(
      new discord.MessageEmbed()
          .setTitle('SUCCESS')
          .setColor('GREEN')
          .setDescription(`The user with ID \`\`${user.id}\`\` was succesfuly ban of your server.\n\n**Reason :** ${args.slice(2).join(' ')}\n**Duration :** ${ms(ms(args[1]))} minute(s)`)
          .setTimestamp()
    )
    
      logch.send(
          new discord.MessageEmbed()
              .setTitle("TempBan | " + user.displayName)
              .addField('Moderator', message.author, true)
              .addField('Reason', args.slice(1).join(' '), true)
              .setTimestamp()
              .setColor('DARK_RED')
      )
    
    setTimeout(function () {
      try {
          message.guild.members.unban(user, {reason: "Unban Automatic"})
          message.channel.send(
              new discord.MessageEmbed()
                  .setTitle('SUCCESS')
                  .setColor('GREEN')
                  .setDescription(`The user with ID \`\`${user.id}\`\` was succesfuly debanned of the server after \`\`${ms(ms(args[1])).replace("s", " seconds").replace("m", " minutes").replace("h", " hours").replace("d", " days")}\`\` of ban.`)
                  .setTimestamp()
          )
      } catch(e){
          console.log(e.message)
      }
    }, ms(args[1]))
  }

}

module.exports.help = {
    name: 'tempban',
    description:"ban temporairement quelqu'un <tempban> <durée> <mention> <raison>"

  }