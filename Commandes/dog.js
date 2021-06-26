const path = require('path');
const fs = require('fs');
const discord = require('discord.js')
const superagent = require('superagent')
module.exports.run = async (client, message, args) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;
    let msg = await message.channel.send(". . . Preparation . . .");
        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`);
        if(!{body}) return message.channel.send("Malheureusement, une erreur est survenue.");

        await message.channel.send({
            files: [{
                attachment: body.message,
                name: "dog.png"
            }]
        }).then(() => msg.delete()); //after message sent delete ...generating
}

module.exports.help = {
    name: "dog"
  }