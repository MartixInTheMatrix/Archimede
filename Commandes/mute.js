const Discord = require('discord.js')
const path = require('path')
module.exports.run = async (client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    if(lang === "fr") {
        message.delete();
        if(!message.member.hasPermission("VIEW_LOGS")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Il vous faut la permission `VIEW_LOGS` pour faire cette commande')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Veuillez mentionner un utilisateur')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Veuillez entrer la raison du mute.')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        let user = message.mentions.members.first() || args[0];
    
        if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Je ne peux pas mute cette personne car elle a la permission `ADMINISTRATOR`')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
 
        let muteRole = message.guild.roles.cache.find(r => r.name === 'Mute');
    
        if(!muteRole){
            try{
                muteRole = await message.guild.roles.create({
                    data: {
                        name: "Mute",
                        color: "#000000",
                        premissions: "NONE"
                    }
                })
            } catch(e){
                console.log(e.stack);
            }
            
        }
    
        await user.roles.add(muteRole)
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`<:check:792807778607431730> ❱ L'utilisateur \`${user.displayName}\` à correctement été rendu muet.\n\n**Raison :** ${args.slice(1).join(' ')}`)
                .setColor('GREEN')
                .setTimestamp()
        )
        await user.send(
            new Discord.MessageEmbed()
                .setTitle(`<:warn:792807848471822367> ❱ Vous avez été rendu muet sur le serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(1).join(' ')}`)
                .setColor('YELLOW')
                .setTimestamp()
        )
        
    }else if(lang === "en"){
        message.delete();
        if(!message.member.hasPermission("VIEW_LOGS")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ You need the `VIEW_LOGS` permission to do this.')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Please mention a user')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('<:x_:792807799344070676> ❱ Please enter the mute reason.')
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        let user = message.mentions.members.first() || args[0];
    
        if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(`<:x_:792807799344070676> ❱ I can\'t mute the user because he has the \`ADMINISTRATOR\` permission.`)
                    .setColor('RED')
                    .setTimestamp()
            )
        }
    
        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
    
        if(!muteRole){
            try{
                muteRole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#000000",
                        premissions: "NONE"
                    }
                })
            } catch(e){
                console.log(e.stack);
            }
            
        }
    
        await user.roles.add(muteRole)
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`<:check:792807778607431730> ❱ The user \`${user.displayName}\` was succesfuly muted.\n\n**Reason :** ${args.slice(1).join(' ')}`)
                .setColor('GREEN')
                .setTimestamp()
        )
        await user.send(
            new Discord.MessageEmbed()
                .setTitle(`<:warn:792807848471822367> ❱ You was mute in the server \`\`${message.guild.name}\`\`.\n\n**Modérator :** ${message.author}\n**Reason :** ${args.slice(1).join(' ')}`)
                .setColor('YELLOW')
                .setTimestamp()
        )
        }
    };
    module.exports.help = {
        name: 'mute',
        description: `Rendre muet quelqu'un sur le serveur`
    }