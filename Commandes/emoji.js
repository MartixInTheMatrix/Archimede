const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message, args) => {

    message.guild.emojis.create('https://i.imgur.com/w3duR07.png', 'rip')
    .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
    .catch(console.error);

message.channel.send();
}
module.exports.help = {
    name: 'emoji',
  }