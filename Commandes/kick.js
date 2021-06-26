const discord = require('discord.js');
const path = require('path')
module.exports.run = async (client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
    if(!message.member.PermissionResolvable) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Mentionne un utilisateur valable");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison indiqué";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} je ne peux pas kick ce membre car : ${error}`));
      const cadegageEmbed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(`${member.user.tag} a été kick par ${message.author.tag}`,`car : ${reason}`)
      .setFooter('Archimede | kick')
    message.channel.send(cadegageEmbed);


}
  }else if(lang === "en"){
    if(!message.member.PermissionResolvable) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valable user");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} i can\'t kick this user because : ${error}`));
      const cadegageEmbed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(`${member.user.tag} kicked by ${message.author.tag}`,`Because : ${reason}`)
      .setFooter('Archimede | kick')
    message.channel.send(cadegageEmbed);


}
  }

}

module.exports.help = {
  name: 'kick',
  description:"kick quelqu'un <kick> <mention> <raison>"
}