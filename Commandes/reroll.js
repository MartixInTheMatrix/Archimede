const Discord = require('discord.js');
const ms = require('ms');
const path = require('path');

module.exports.run = async (client, message, args) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;



    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Giveaways');

    if(lang === 'fr'){

      if(hasPerm === false || !hasRole == null) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescrtiption('Il vous faut la permission `MANAGE_MESSAGES` ou un rôle nommé `giveaways` pour faire cette commande.')
          .setTimestamp()
      )

      if(!args[0]) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('__ERREUR__')
            .setColor('RED')
            .setDescription('Veuillez entrer l\'ID du giveaway.')
            .setTimestamp()
        )
      }

      client.giveawaysManager.reroll(args[0], {
        messages: {
          congrat: "\`🎁\`・Bien joué au nouveau gagnant: {winners}",
        }
      })
    } else if(lang === 'en'){
      if(hasPerm === false || !hasRole == null) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescription('You need `MANAGE_MESSAGES` permissions or a role named ``giveaway`` to use that command.')
          .setTimestamp()
      )

      if(!args[0]) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('__ERROR__')
            .setColor('RED')
            .setDescription('Please, enter the giveaway ID')
            .setTimestamp()
        )
      }

      client.giveawaysManager.reroll(args[0], {
        messages: {
          congrat: "\`🎁\`・Congratulations: {winners}",
        }
      })
    }
      
}

module.exports.help = {
  name: "reroll"
}