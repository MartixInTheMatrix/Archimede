const path = require('path')
module.exports.run = async (client, message, args) => {
  const langues = require('../database/lang.json')
  let lang = langues[message.guild.id].langues;

  if(lang === "fr") {
    if(!message.author.id === '661525561394462730') return message.channel.send('Tu ne peux pas.')
    if(!args[0]) return message.channel.send('Veuillez entrer le nom du fichier de la commande.')
  
    let commandName = args[0].toLowerCase();
  
    try {
      client.commands.delete(commandName);
      const pull = require(`./${commandName}.js`);
      client.commands.set(commandName, pull)
    } catch(e){
      return message.channel.send(`Je n'ai pas pu reload la commande \`${commandName}\`.`)
    }
    message.channel.send('La commande ``' + commandName + '`` à bien été rechargée.')
  }else if(lang === "en"){
    if(!message.author.id === '661525561394462730') return message.channel.send('You can\'t.')
    if(!args[0]) return message.channel.send('Please enter the file of the command .')
  
    let commandName = args[0].toLowerCase();
  
    try {
      client.commands.delete(commandName);
      const pull = require(`./${commandName}.js`);
      client.commands.set(commandName, pull)
    } catch(e){
      return message.channel.send(`I could not reload the command \`${commandName}\`.`)
    }
    message.channel.send('The command ``' + commandName + '`` was succesfuly reloaded.')
  }
}

module.exports.help = {
  name: 'reload'
}