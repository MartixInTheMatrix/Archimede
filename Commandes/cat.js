const path = require('path');
const fs = require('fs');
const discord = require('discord.js')
const superagent = require('superagent')
const snekfetch = require('snekfetch')

module.exports.run = async (client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;
    const superagent = require('superagent');
    const sf = require("snekfetch");
const { body } = await superagent
.get("http://aws.random.cat/meow");

const embed = new discord.MessageEmbed()
.setColor("#2f3136")
.setImage(body.file) 
message.channel.send({embed});
}

module.exports.help = {
    name: "cat"
  }