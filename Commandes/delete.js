const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission !')
  if(!args[0]) return message.channel.send("Veuillez entrer l'identifiant du message du giveaways.")
  let messageID = args[0];
  client.giveawaysManager.delete(messageID).then(() => {
    message.channel.send("Giveaway supprimé !");
  }).catch((err) => {
    message.channel.send("Aucune giveaway n'existe avec l'identifiant " + messageID);
  });
}

module.exports.help = {
  name: 'delete'
}