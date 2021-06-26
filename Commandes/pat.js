const path = require('path');
const fs = require('fs');
const discord = require('discord.js')
const superagent = require('superagent');
module.exports.run = async (client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;


    if(lang === "fr"){
        if (!message.mentions.members.first()) return message.reply("Tu dois mentionner quelqu'un :3");
        if (message.mentions.members.first().id === client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
        const { body } = await superagent
        .get("https://nekos.life/api/pat");
        
        const pembed = new discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`OwO ${message.mentions.members.first().username}, a été carressé par ${message.author.username}!`)
        .setImage(body.url)
        message.channel.send(pembed)
    }else if(lang === "en"){
        if (!message.mentions.members.first()) return message.reply("You have to mention someone :3");
        if (message.mentions.members.first().id === client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
        const { body } = await superagent
        .get("https://nekos.life/api/pat");
        
        const pembed = new discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`OwO ${message.mentions.members.first().username}, was pat by ${message.author.username}!`)
        .setImage(body.url) 
        message.channel.send(pembed)
    }
}

module.exports.help = {
    name: "pat"
  }