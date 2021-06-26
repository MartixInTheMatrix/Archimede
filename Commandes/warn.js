const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    const fs = require('fs')
    const warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"))
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
        .setTitle("<:x_:792807799344070676> ❱ Vous n'êtes pas autorisé à utiliser cette commande! ")
        .setColor('RED')
        if (!message.member.guild.me.hasPermission("ADMINISTRATOR"))
            return message.channel.send(permisjebota)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permisje)
    
        if(!args[0, 1]) {
            const bananekbot = new discord.MessageEmbed()
            .setTitle("<:x_:792807799344070676> ❱ Vous n'avez pas fourni d'arguments!")
            .setColor('RED')
            .setDescription("La commande est: `&warn <mention> <raison>`")
            return message.channel.send(bananekbot)
        }
    
        var warnUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
        var reason = args.slice(1).join(" ")
    
        if (!warnUser) return msg.channel.send(
            new discord.MessageEmbed()
            .setTitle("<:x_:792807799344070676> ❱ Utilisateur introuvable !")
            .setColor('RED')
            .setDescription("La commande est: `&warn <mention> <raison>`")
        )
    
        if (!warns[warnUser.id]) warns[warnUser.id] = {
            warns: 0,
        }
    
        warns[warnUser.id].warns++
    
        fs.writeFile("../database/warns.json", JSON.stringify(warns), (err) =>{
            if(err) console.log(err)
        })
    
        const warnembed =  new Discord.MessageEmbed()
        .setTitle(`<:check:792807778607431730> ❱ L'utilisateur \`${warnUser}\` à correctement été rendu muet.\n\n**Raison :** ${reason}`)
        .setColor('GREEN')
        .setTimestamp()
        return msg.channel.send(warnembed)
    }else if(lang === "en"){
        const args = message.content.split(' ').slice(1);    
        // Embed na permisjebota
        const permisjebota = new discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> ❱ I haven\'t the rights permissions! ")
        .setColor('RED')
        .setTimestamp()
        // Embed na permisje dla użytkownika
        const permisje = new discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> ❱ You are not authorized to use this command!")
        .setColor('RED')
        if (!message.member.guild.me.hasPermission("ADMINISTRATOR"))
            return message.channel.send(permisjebota)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permisje)
    
        if(!args[0, 1]) {
            const bananekbot = new discord.MessageEmbed()
            .setTitle("<:x_:792807799344070676> ❱ You did not provide any arguments!")
            .setColor('RED')
            .setDescription("The command is: `&warn <mention> <reason>`")
            return message.channel.send(bananekbot)
        }
    
        var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
    
        var reason = args.slice(1).join(" ")
    
        if (!warnUser) return msg.channel.send(
            new discord.MessageEmbed()
            .setTitle("<:x_:792807799344070676> ❱ Invalid user !")
            .setColor('RED')
            .setDescription("The command is: `&warn <mention> <reason>`")
        )
    
        if (!warns[warnUser.id]) warns[warnUser.id] = {
            warns: 0,
        } 
    
        warns[warnUser.id].warns++
    
        fs.writeFile("../database/warns.json", JSON.stringify(warns), (err) =>{
            if(err) console.log(err)
        })
    
        const warnembed = new discord.MessageEmbed()
        .setTitle("<:warn:792807848471822367> ❱ Warned user")
        .setColor('ffff00')
        .setTimestamp()
        .setDescription(`Warned user : ${warnUser} (${warnUser.id})
        By : ${msg.author}
        Beacause : ${reason}
        The user is now at ${warns[`${warnUser.id}`].warns} warn(s)`)
        return msg.channel.send(warnembed)
    }

   
    }
    module.exports.help = {
        name: 'warn',
        description: `warn quelqu'un, <warn> <mention> <raison>`
      }