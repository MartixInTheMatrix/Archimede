const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    if(lang === "fr") {
        message.channel.send({
            embed: {
                color: '#2f3136',
                description: `> \🔗 **Invitation:** [Clique ici](https://discord.com/api/oauth2/authorize?client_id=784551244151652372&permissions=8&scope=bot)`,
                footer :{
                  icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
                  text : 'Archimède | invite'
                }
            }
        })
    }else if(lang === "en"){
        message.channel.send({
            embed: {
                color: '#2f3136',
                description: `> \🔗 **Invitation:** [Click here](https://discord.com/api/oauth2/authorize?client_id=784551244151652372&permissions=8&scope=bot)`,
                footer :{
                  icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
                  text : 'Archimède | invite'
                }
            }
        })
    }
}
module.exports.help = {
    name: 'invite',
    description:"Donne le lien d'invitation du bot"
  }