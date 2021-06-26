const Discord = module.require('discord.js');
const moment = require('moment');
const path = require('path');
var os = require('os');

module.exports.run = async(client, message, args) => {
    const langues = require('../database/lang.json')
    let langue = langues[message.guild.id].langues;
    
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
    

    if(langue === 'fr'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle("Informations")
                .setDescription(`Voici les informations de <@${client.user.id}>.
                
                ⚙️ **__Informations Système__:**
                
                > 💽 **Os:** MacOSX
                > 💿 **RAM Totale:** ${totalMemory} GB
                > 🗑️ **RAM Utilisée:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Informations sur le bot__:**

                > 👑 **Créateur:** <@626431238491734026>
                > 🏙️ **Serveurs:** ${client.guilds.cache.size}
                > 👤 **Utilisateurs:** ${client.users.cache.size}
                > 📌 **Salons:** ${client.channels.cache.size}

                🔗 **__Liens__:**
                
                > \🔗 **Invitation:** [Clique ici](https://discord.com/oauth2/authorize?client_id=783715781154177025&permissions=8&scope=bot)
                > \💡 **Serveur support:** [Clique pour rejoindre](https://discord.gg/R4xFrdtQgV)
                > <:github:792835232780124240> **Github:** [Mon github](https://github.com/MartixInTheMatrix)`)
        );
    } else if(langue === 'en'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle("Informations")
                .setDescription(`Here is all the <@${client.user.id}>'s informations.
                
                ⚙️ **__System Informations__:**
                
                > \💽 **Os:** Linux
                > \💿 **Total RAM:** ${totalMemory} GB
                > \🗑️ **Used RAM:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Bot informations__:**

                > 👑 **Creator:** <@626431238491734026>
                > 🏙️ **Guilds:** ${client.guilds.cache.size}
                > 👤 **Users:** ${client.users.cache.size}
                > 📌 **Channels:** ${client.channels.cache.size}
                
                🔗 **__Links__:**
                
                > \🔗 **Invite:** [Click here](https://discord.com/oauth2/authorize?client_id=783715781154177025&permissions=8&scope=bot)
                > \💡 **Support Server:** [Click to join](https://discord.gg/R4xFrdtQgV)
                > <:github:763840373587574815> **Github:** [My github repository](https://github.com/MartixInTheMatrix)`)
        );
    }
}

module.exports.help = {
    name: 'info'
}