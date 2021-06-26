const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    const fs = require('fs')
const warns = JSON.parse(fs.readFileSync("../database/warns.json", "utf8"))
const moment = require('moment')
const msg = message
    if(lang === "fr") {
        const args = message.content.split(' ').slice(1);    
        // Embed na permisjebota
        const permisjebota = new discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> ❱ Je n'ai pas les permissions pour ca! ")
        .setColor('RED')
        .setTimestamp()
        // Embed na permisje dla użytkownika
        const permisje = new discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> ❱ Vous n'êtes pas autorisé à utiliser cette commande!")
        .setColor('RED')
        if (!message.member.guild.me.hasPermission("ADMINISTRATOR"))
            return msg.channel.send(permisjebota)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permisje)
    
        var warnUser = message.guild.member(msg.mentions.users.first() || message.guild.members.cache.get(args[0]))
    
        var reason = args.slice(1).join(" ")
    
        if (!warnUser) return message.channel.send(
            new discord.MessageEmbed()
            .setTitle("<:x_:792807799344070676> ❱ Utilisateur invalide ! ")
            .setColor('RED')
            .setDescription("La commande est `[prefix]unwarn <mention>`")
        )
    
        if (!warns[warnUser.id]) warns[warnUser.id] = {
            warns: 0,
        } 
    
        warns[warnUser.id].warns--
    
        fs.writeFile("../database/warns.json", JSON.stringify(warns), (err) =>{
            if(err) console.log(err)
        })
    
        const warnembed = new discord.MessageEmbed()
        .setTitle("<:warn:792807848471822367> Utilisateur unwarn")
        .setColor('ffff00')
        .setTimestamp()
        .setDescription(`Utilisateur unwarn : ${warnUser} (${warnUser.id})
        Par : ${msg.author}
        Car : ${reason}
        L'utilisateur est maintenant a ${warns[`${warnUser.id}`].warns}`)
        return message.channel.send(warnembed)
    }else if(lang === "en"){
        const args = message.content.split(' ').slice(1);    
    // Embed na permisjebota
    const permisjebota = new discord.MessageEmbed()
    .setTitle("<:x_:792807799344070676> I haven\'nt the rights permissions! ")
    .setColor('RED')
    .setDescription("I am not authorized for this command! Give me the permissions or consult the server administrator")
    .setTimestamp()
    // Embed na permisje dla użytkownika
    const permisje = new discord.MessageEmbed()
    .setTitle("<:x_:792807799344070676> You are not authorized to use this command! ")
    .setColor('RED')
    .setDescription("You are not authorized to this command! If you think this is a bug, please consult the server administrator!")
    if (!message.member.guild.me.hasPermission("ADMINISTRATOR"))
        return msg.channel.send(permisjebota)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permisje)

    var warnUser = message.guild.member(msg.mentions.users.first() || message.guild.members.cache.get(args[0]))

    var reason = args.slice(1).join(" ")

    if (!warnUser) return message.channel.send(
        new discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> Invalid user ! ")
        .setColor('RED')
        .setDescription("The commande is `[prefix]unwarn <mention>`")
    )

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0,
    } 

    warns[warnUser.id].warns--

    fs.writeFile("../database/warns.json", JSON.stringify(warns), (err) =>{
        if(err) console.log(err)
    })

    const warnembed = new discord.MessageEmbed()
    .setTitle("<:warn:792807848471822367>Unwarn user")
    .setColor('ffff00')
    .setTimestamp()
    .setDescription(`Unwarn user : ${warnUser} (${warnUser.id})
    By : ${msg.author}
    Because : ${reason}
    The user has now ${warns[`${warnUser.id}`].warns}`)
    return message.channel.send(warnembed)
    }

}
module.exports.help = {
    name: 'unwarn',
    description: `Enleve un warn à quelqu'un, <unwarn> <mention> <raison>`
  }