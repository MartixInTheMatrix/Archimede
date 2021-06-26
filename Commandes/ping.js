const Discord = require('discord.js');
const path = require('path')
const os = require('os')
module.exports.run = async (client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    if(lang === "fr") {
        let msg = await message.channel.send('__Test de latence...__')
        var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

        var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
      
        usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
        totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);

        msg.edit(
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
                .setColor('#2f3136')
                .addField('Latence CLIENT', Math.round(client.ws.ping) + 'ms') // Ici, ça envoie la latence du client.
                .addField('En ligne depuis', msToTime(client.uptime)) // Ici, ça vas envoyer depuis quand le bot est en ligne.
                .setDescription(` > <:user:792807829940862986> **Os:** MacOSX
                > <:CPU:792809052823748648> **RAM Totale:** ${totalMemory} GB
                > <:utility:792809858045837333> **RAM Utilisée:** ${usedMemory} GB *(${getpercentage})*`)
        )
    
        function msToTime(ms){
            days = Math.floor(ms / 86400000); // 24*60*60*1000
            daysms = ms % 86400000; // 24*60*60*1000
            hours = Math.floor(daysms / 3600000); // 60*60*1000
            hoursms = ms % 3600000; // 60*60*1000
            minutes = Math.floor(hoursms / 60000); // 60*1000
            minutesms = ms % 60000; // 60*1000
            sec = Math.floor(minutesms / 1000);
          
            let str = "";
            if (days) str = str + days + "d";
            if (hours) str = str + hours + "h";
            if (minutes) str = str + minutes + "m";
            if (sec) str = str + sec + "s";
          
            return str;
        } // Ici, c'est une fonction pour convertir les milisecondes en h, m, d etc...
    }else if(lang === "en"){
        let msg = await message.channel.send('__Latency test...__')
        var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

        var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
      
        usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
        totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);

    msg.edit(
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
        .setColor('#2f3136')
        .addField('CLIENT latency', Math.round(client.ws.ping) + 'ms') // Ici, ça envoie la latence du client.
        .addField('Online since', msToTime(client.uptime)) // Ici, ça vas envoyer depuis quand le bot est en ligne.
        .setDescription(` > <:user:792807829940862986> **Os:** MacOSX
        > <:CPU:792809052823748648> **RAM Totale:** ${totalMemory} GB
        > <:utility:792809858045837333> **RAM Utilisée:** ${usedMemory} GB *(${getpercentage})*`)
    )

    function msToTime(ms){
        days = Math.floor(ms / 86400000); // 24*60*60*1000
        daysms = ms % 86400000; // 24*60*60*1000
        hours = Math.floor(daysms / 3600000); // 60*60*1000
        hoursms = ms % 3600000; // 60*60*1000
        minutes = Math.floor(hoursms / 60000); // 60*1000
        minutesms = ms % 60000; // 60*1000
        sec = Math.floor(minutesms / 1000);
      
        let str = "";
        if (days) str = str + days + "d";
        if (hours) str = str + hours + "h";
        if (minutes) str = str + minutes + "m";
        if (sec) str = str + sec + "s";
      
        return str;
    } // Ici, c'est une fonction pour convertir les milisecondes en h, m, d etc...
    }
}

module.exports.help = {
    name: 'ping', // Nom de la commande, nécessaire pour que ça marche
    description: `Envoie la latence du bot.` // Déscription de la commande.
}