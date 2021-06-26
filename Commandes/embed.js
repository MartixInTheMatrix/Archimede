const discord = require('discord.js');
const path = require('path')


module.exports.run = async(client, message) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  let args = message.content.split(" ")
        const ti = message.content.slice(7)
  if(lang === "fr") {
    if(!args[0, 1]) {
      const bananekbot = new discord.MessageEmbed()
      .setTitle("Vous n'avez pas fourni de titre !")
      .setColor('#2f3136')
      .setDescription("La commande est: `&embed <titre>`")
      return message.channel.send(bananekbot)
  }
    const filter = m => m.author.id === message.author.id;
    let msgrepl = message.reply(
      new discord.MessageEmbed()
      .setTitle("Inserez un texte qui fera office de description")
      .setColor("#2f3136")
    )
    message.channel.awaitMessages(filter, {
    max: 1,
    time: 3000000
    }).then(async collected => {
    const desc = collected.first().content;

    const flashEmbed = new discord.MessageEmbed()
    .setColor('#2f3136')
    .setTitle('<:announce:792808009939025970> ' + ti)
    .setDescription(desc)
    let msg = await message.channel.send(flashEmbed)
      await msg.react("✅")
    })
  }else if(lang === "en"){
    if(!args[0, 1]) {
      const bananekbot = new discord.MessageEmbed()
      .setTitle("You did not provide a title !")
      .setColor('#2f3136')
      .setDescription("The command is: `&embed <title>`")
      return message.channel.send(bananekbot)
  }
    const filter = m => m.author.id === message.author.id;
    let msgrepl = message.reply(
      new discord.MessageEmbed()
      .setTitle("Insert a text that will act as a description")
      .setColor("RANDOM")
    )
    message.channel.awaitMessages(filter, {
    max: 1,
    time: 30000000
    }).then(async collected => {
    const desc = collected.first().content;

    const flashEmbed = new discord.MessageEmbed()
    .setColor('#2f3136')
    .setTitle('<:announce:792808009939025970> ' + ti)
    .setDescription(desc)
    let msg = await message.channel.send(flashEmbed)
      await msg.react("✅")
    })
  }
    }

    module.exports.help = {
        name: 'embed',
        description: "crée un embed pour les annonces ou autre"
    }