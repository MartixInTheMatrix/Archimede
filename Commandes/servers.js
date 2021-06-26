const Discord = require("discord.js");
var guilds = [];
const path = require('path')
module.exports.run = async(client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    if(lang === "fr") {
        client.guilds.cache.forEach(g => {
            guilds.push(g.name)
        });
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle("<:serveur:795082330385285150> Liste des serveurs")
                .setDescription(`\n__Serveurs__ :\n\n> ${guilds.join(",\n> ")}`)
                .addField('Liens', '[Ajouter le bot](https://discord.com/oauth2/authorize?client_id=784551244151652372&permissions=8&scope=bot)\n[Support](https://discord.gg/akk9QKanTc)')
                .setFooter('By martix')
        )
        guilds = [];
    }else if(lang === "en"){
        client.guilds.cache.forEach(g => {
            guilds.push(g.name)
        });
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle("<:serveur:795082330385285150> Servers list")
                .setDescription(`\n__Servers__ :\n\n> ${guilds.join(",\n> ")}`)
                .addField('Links', '[Add the bot](https://discord.com/oauth2/authorize?client_id=784551244151652372&permissions=8&scope=bot)\n[Support](https://discord.gg/akk9QKanTc)')
                .setFooter('By Martix')
        )
        guilds = [];
    }
    }
module.exports.help = {
    name: "servers"
}