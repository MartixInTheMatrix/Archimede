const discord = require('discord.js');
const path = require('path')

module.exports.run = async (client, message) => {
    const langues = require('../database/lang.json')
    let lang = langues[message.guild.id].langues;

const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    const amount = args.join(' '); // Amount of messages which should be deleted
    if(lang === "fr") {
        if (!amount) return msg.reply('Tu n\'a pas donner le nombre de messages a supprimer !'); // Checks if the `amount` parameter is given
        if (isNaN(amount)) return msg.reply('L\'argument apres la commadne n\'est pas un nombre !'); // Checks if the `amount` parameter is a number. If not, the command throws an error
        if (amount > 100) return msg.reply('Tu ne peux pas supprimer plus de 100 messages a la fois !'); // Checks if the `amount` integer is bigger than 100
        if (amount < 1) return msg.reply('Tu dois supprimer au moins un message !'); // Checks if the `amount` integer is smaller than 1
        await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
            message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        )});
    
        let msgnext = await message.channel.send(`J'ai supprimé ${amount} messages`)
    
        setInterval(() => {
         msgnext.delete()
        }, 5000 );
    }else if(lang === "en"){

    
    if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
    if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
    await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
        message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
    )});

    let msgnext = await message.channel.send(`I\'ve deleted ${amount} messages`)

    setInterval(() => {
     msgnext.delete()
    }, 5000 );
}
}

module.exports.help = {
    name: 'clear',
    description:"supprime les messages d'un salon <clear> <nombre de messages a supprimer>"
  }