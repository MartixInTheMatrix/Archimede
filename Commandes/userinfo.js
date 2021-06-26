const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

    if(lang === "fr") {
        const membre = message.mentions.members.first() || message.member;
        const moment = require('moment')
                    message.channel.send({
                        embed: {
                            color: '#2f3136',
                            title: `<:user:792807829940862986> __Statistiques du l'utilisateur **${membre.user.username}**__`,
                            fields: [
                                {
                                    name: 'ID :',
                                    value: membre.id
                                },
                                {
                                    name: 'Crée le :',
                                    value: moment.utc(membre.user.createdAt).format("LL")
                                },
                                {
                                    name: 'Rejoint le :',
                                    value: moment.utc(membre.joinedAt).format('LL')
                                },
                                {
                                  name: 'Dernier message :',
                                  value: membre.lastMessage
                              },
                              {
                                name: 'Nombre de roles :',
                                value: membre.roles.cache.size
                            },
                            {
                              name: 'Boosteur :',
                              value: membre.premiumSince
                          },
                          {
                            name: 'Createur du serveur :',
                            value: message.guild.owner
                        },
                            ],
                            footer :{
                              icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
                              text : 'Archimède | userinfo'
                            }
                        }
                    })
    }else if(lang === "en"){
        const membre = message.mentions.members.first() || message.member;
const moment = require('moment')
            message.channel.send({
                embed: {
                    color: '#2f3136',
                    title: `Stats of the user **${membre.user.username}**`,
                    fields: [
                        {
                            name: 'ID :',
                            value: membre.id
                        },
                        {
                            name: 'Created at :',
                            value: moment.utc(membre.user.createdAt).format("LL")
                        },
                        {
                            name: 'Joined at :',
                            value: moment.utc(membre.joinedAt).format('LL')
                        },
                        {
                          name: 'Last message :',
                          value: membre.lastMessage
                      },
                      {
                        name: 'Role number :',
                        value: membre.roles.cache.size
                    },
                    {
                      name: 'Booster :',
                      value: membre.premiumSince
                  },
                    ],
                    footer :{
                      icon_url: "https://cdn.discordapp.com/attachments/732540419673686017/785144578042626048/image0.png",
                      text : 'Archimède | userinfo'
                    }
                }
            })
    }

        }

        module.exports.help = {
            name: 'userinfo',
            description: `Donne les stats de quelqu'un <userinfo> <mention> ou juste <userinfo>`
          }