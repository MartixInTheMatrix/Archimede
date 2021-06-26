const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')

module.exports.run = async (client, message, args) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
    if(!message.member.hasPermission('ADMINISTRATOR') && message.author.id != '661525561394462730'){
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescription("Vous avez besoin de la permission ``ADMINISTRATOR`` pour faire cette commande.")
          .setTimestamp()
      )
    }
  
    let embed = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Ajout d'un rôle de bypass")
        .setColor('#2f3136')
        .setDescription("Veuillez entrer ci-dessous l'identifiant ou la mention du rôle souhaité.\n``Si vous souhaitez quitter, entrer stop ou cancel.``")
        .setTimestamp()
    )
  
    let error = false;
    let ro;
  
    await message.channel.awaitMessages(m => m.author.id === message.author.id, {
      max: 1,
      time: 60000,
      errors: ["time"]
    }).then(collected => {
      ro = collected.first().content;
      collected.first().delete();
    }).catch((err) => {
      error = true;
      embed.edit(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescription("Vous n'avez pas entrer de rôle. Annulation !")
          .setTimestamp()
      );
      return;
    });
  
    if(error) return;
    ro = ro.replace('<', '').replace('@', '').replace('>', '').replace('&', '');
  
    if(ro === 'stop' || ro === 'cancel'){
      return message.channel.send('Annulation.');
    }
  
    let role = message.guild.roles.cache.find(r => r.id === ro);
    if(!role){
      return embed.edit(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescription("Ce rôle est introuvable.")
          .setTimestamp()
      )
    }
  
    embed.edit(
      new Discord.MessageEmbed()
        .setAuthor(role.id, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
        .setColor('GREEN')
        .setDescription("Vous avez bien modifier le rôle de bypass des giveaways pour le rôle " + role.name + ".")
        .setTimestamp()
    )
  
    let bypassRole = require(path.resolve(path.join('..', 'GWays/database/bypass.json')));
    bypassRole[message.guild.id] = {
      bypass: role.id
    }
    fs.writeFile(path.resolve(path.join('..', 'GWays/database/bypass.json')), JSON.stringify(bypassRole, null, 2), (err) => {
      if(err) console.log(err)
    });
  
  }else if(lang === "en"){
    if(!message.member.hasPermission('ADMINISTRATOR') && message.author.id != '661525561394462730'){
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERROR__')
          .setColor('RED')
          .setDescription("You need the ``ADMINISTRATOR`` permission to do this.")
          .setTimestamp()
      )
    }
  
    let embed = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Adding a role of bypass")
        .setColor('#2f3136')
        .setDescription("Please enter the username or mention of the desired role below. \n``If you want to quit, enter stop or cancel..``")
        .setTimestamp()
    )
  
    let error = false;
    let ro;
  
    await message.channel.awaitMessages(m => m.author.id === message.author.id, {
      max: 1,
      time: 60000,
      errors: ["time"]
    }).then(collected => {
      ro = collected.first().content;
      collected.first().delete();
    }).catch((err) => {
      error = true;
      embed.edit(
        new Discord.MessageEmbed()
          .setTitle('__ERROR__')
          .setColor('RED')
          .setDescription("You did not enter a role. Cancellation.")
          .setTimestamp()
      );
      return;
    });
  
    if(error) return;
    ro = ro.replace('<', '').replace('@', '').replace('>', '').replace('&', '');
  
    if(ro === 'stop' || ro === 'cancel'){
      return message.channel.send('Annulement.');
    }
  
    let role = message.guild.roles.cache.find(r => r.id === ro);
    if(!role){
      return embed.edit(
        new Discord.MessageEmbed()
          .setTitle('__ERROR__')
          .setColor('RED')
          .setDescription("This role not found.")
          .setTimestamp()
      )
    }
  
    embed.edit(
      new Discord.MessageEmbed()
        .setAuthor(role.id, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
        .setColor('GREEN')
        .setDescription("You have modified the bypass role of giveaways " + role.name + ".")
        .setTimestamp()
    )
  
    let bypassRole = require(path.resolve(path.join('..', 'Archimede/database/bypass.json')));
    bypassRole[message.guild.id] = {
      bypass: role.id
    }
    fs.writeFile(path.resolve(path.join('..', 'Archimede/database/bypass.json')), JSON.stringify(bypassRole, null, 2), (err) => {
      if(err) console.log(err)
    });
  
  }

}

module.exports.help = {
  name: 'setbypassrole'
}