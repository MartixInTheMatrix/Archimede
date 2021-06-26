const discord = require("discord.js");
const path = require('path')
module.exports.run = async(client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;


const serv = message.guild;
const moment = require('moment')
    if(lang === "fr") {
      message.channel.send({
        embed: {
            color: '#2f3136',
            title: `Statistiques du serveur **${message.guild.name}**`,
            fields: [
              {
                name: 'Nombre de membres :',
                value: serv.memberCount
            },
          {
            name: 'Region :',
            value: serv.region
        },
                {
                    name: 'ID :',
                    value: serv.id
                },
                {
                    name: 'Crée le :',
                    value: moment.utc(serv.createdAt).format("LL")
                },
                {
                  name: 'Createur du serveur :',
                  value: serv.owner
              },
              {
                name: 'Nombre de roles :',
                value: serv.roles.cache.size
            },
            {
              name: 'Nombre de salons :',
              value: serv.channels.cache.size
          },
            ],
            footer :{
              icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
              text : 'Archimède | serverinfo'
            }
        }
    });
    }else if(lang === "en"){
      message.channel.send({
        embed: {
            color: '#2f3136',
            title: `Server Stats of **${message.guild.name}**`,
            fields: [
              {
                name: 'Members number :',
                value: serv.memberCount
            },
          {
            name: 'Region :',
            value: serv.region
        },
                {
                    name: 'ID :',
                    value: serv.id
                },
                {
                    name: 'Created the :',
                    value: moment.utc(serv.createdAt).format("LL")
                },
                {
                  name: 'Owner of the server :',
                  value: serv.owner
              },
              {
                name: 'Roles number :',
                value: serv.roles.cache.size
            },
            {
              name: 'Channels number :',
              value: serv.channels.cache.size
          },
            ],
            footer :{
              icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
              text : 'Archimède | serverinfo'
            }
        }
    });
    }
          
      };
      module.exports.help = {
        name: "serverinfo",
        description: "Donne les stats du serveur"
    }