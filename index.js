const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); 
client.commands = new Discord.Collection();
const fs = require('fs');
const path = require('path');
const keepAlive = require('./server');
const ytdl = require("ytdl-core");
const queue = new Map();
const leveling = require('discord-leveling')
const talkedAlready = new Set();


const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#2f3136",
        reaction: "🎁"
    }
});
client.giveawaysManager = manager;

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.on('guildCreate', guild => {
    client.users.cache.get("626431238491734026").send("J'ai été ajouté au serveur " + guild.name + ". Je suis désormais sur " + client.guilds.cache.size + " serveurs." + "l'owner du serveur est " + guild.owner.user.tag);
});
  
  client.on("ready", () => {
      let giveawaysNotEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
      client.user.setActivity("Chargement...", {
        status: "DND",
        type: "WATCHING",
        url: "https://twitch.tv/dubrin"
      });
    console.log(
      `${client.user.username} connecté ${client.users.cache.size} utilisateurs, ${giveawaysNotEnded.length} giveaways en cours !`
    );

  });

client.on('message', message => {
    client.user.setActivity(`${client.guilds.cache.size} Guilds and ${client.users.cache.size} Users | &help`, {
      status: "online",
      type: "STREAMING",
      url: "https://twitch.tv/dubrin"
    })
})
client.on('message', async(message) => {
  let prefixes = require(path.resolve(path.join('..', 'Archimede/database/prefixes.json')));
  let prefix = prefixes[message.guild.id].prefixes;
  if(message.content.startsWith(prefix + 'account')){
    const membre = message.mentions.members.first() || message.member
    if(talkedAlready.has(message.author.id)) {
      const credits = JSON.parse(fs.readFileSync("./database/credits.json", "utf8"))
      if (!credits[membre.id]) credits[membre.id] = {
    credits: 0,
  }
    var output = await leveling.Fetch(membre.id)
    message.channel.send(
        new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Profil de '+ membre.displayName , membre.user.displayAvatarURL())
        .setDescription(`> 👤 **Nom:** ${membre.displayName} \n\n> ⏰ **Compte discord crée le:** ${membre.user.createdAt} \n\n> <:piece:792807976627994624>  **Solde:** ${credits[membre.id].credits} credit(s)\n\n> <:boubou:792807993360121896> **level(s):** ${output.level} \n\n> 〽️ **xp:** ${output.xp} xp `)

        )
}else{
  message.channel.send(
    new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('<:check:792807778607431730> ' + membre.displayName + ' Compte crée !')
    .setDescription(`> Vous avez été enregistré dans la base de donnée du serveur.`)
)
talkedAlready.add(message.author.id);

}
  }
})


client.on('message', async(message) => {
  var profile = await leveling.Fetch(message.author.id)
  if(message.author.bot)return
  leveling.AddXp(message.author.id, 1)
  if (profile.xp + 1 > 100) {
    const credits = JSON.parse(fs.readFileSync("./database/credits.json", "utf8"))
    if (!credits[message.member.id]) credits[message.member.id] = {
      credits: 0,
    }
    credits[message.member.id].credits++
    fs.writeFileSync('./credits.json', JSON.stringify(credits), (err) =>{
      if(err) console.log(err)
    })
    await leveling.AddLevel(message.author.id, 1)
    await leveling.SetXp(message.author.id, 0)
    message.channel.send(
        new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`<:boubou:792807993360121896> Tu viens de monter au niveau ${profile.level + 1} ! gg`)
        .setDescription(`Tu viens donc de gagner **1** crédit à ta cagnote !`)
    )
  message.member.send(
      new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('<:announce:792808009939025970> Bravo ' + message.member.displayName + ' tu viens de passer le niveau ' + profile.level)
      .setDescription(`Tu viens de gagner \`1\` credit !`)
  )

  }
  }
)

client.on('message', message => {

  if(message.channel.type === "dm") return;

  let prefixes = require(path.resolve(path.join('..', 'Archimede/database/prefixes.json')));
  const langues = require(path.resolve(path.join('..', 'Archimede/database/lang.json')));
  const bypassr = require(path.resolve(path.join('..', 'Archimede/database/bypass.json')));

  
  if(!langues[message.guild.id]){
    langues[message.guild.id] = {
      langues: 'en'
    }
  }

  if(!bypassr[message.guild.id]){
    bypassr[message.guild.id] = {
      
    }
  }

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: '&'
    }
  }

  fs.writeFile(path.resolve(path.join('..', 'Archimede/database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'Archimede/database/lang.json')), JSON.stringify(langues, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'Archimede/database/bypass.json')), JSON.stringify(bypassr, null, 2), (err) => {
    if(err) console.log(err)
  });

})


client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
        if(member.user.bot) return;
        let langues = require(path.resolve(path.join('..', 'Archimede/database/lang.json')));
        let lang = langues[reaction.message.guild.id].langues;
        let conditionRole;
        let conditionServer;
        
        let bypassRole = require(path.resolve(path.join('..', 'Archimede/database/bypass.json')));
        if(bypassRole[reaction.message.guild.id]){
          if(bypassRole[reaction.message.guild.id].bypass){
            let roole = reaction.message.guild.roles.cache.get(bypassRole[reaction.message.guild.id].bypass)
            if(member.roles.cache.find(r => r.id === roole.id)){
              return member.send(
                new Discord.MessageEmbed()
                  .setAuthor(member.user.tag + ' BYPASS', member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                  .setColor('GREEN')
                  .setDescription(`<:check:792807778607431730> Vôtre entrée pour le giveaway à été approuvée. **Bonne chance !**`)
                  .setFooter(`Giveaway par ${reaction.message.author.tag}`)
                  .setTimestamp()
              )
            }
          }
        }

        let conditionsServers = require(path.resolve(path.join('..', 'Archimede/database/conditionsServers.json')));
        if(conditionsServers[giveaway.messageID]){
            conditionServer = conditionsServers[giveaway.messageID].conditionServer;
        }
        
        let conditionsRoles = require(path.resolve(path.join('..', 'Archimede/database/conditionRole.json')));
        if(conditionsRoles[giveaway.messageID]){
            conditionRole = conditionsRoles[giveaway.messageID].conditionRole;
        }
        if(lang === 'fr'){
            if(conditionServer != 'Aucune'){
                let guild = client.guilds.cache.get(conditionServer);
                if(guild.members.cache.find(m => m.id === member.id)){
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('GREEN')
                            .setDescription(`<:check:792807778607431730> Vôtre entrée pour [ce giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) à été approuvée. **Bonne chance !**`)
                            .setFooter(`Giveaway par ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                } else {
                    let chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                    let invitation = chx.createInvite({
                        maxAge: 0,
                        maxUses: 0
                    }).catch(console.error);
                    reaction.users.remove(member.id)
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('RED')
                            .setDescription(`<:x_:792807799344070676> Vôtre entrée pour [ce giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) à été refusée. Pour participer, vous devez rejoindre [${guild.name}](https://discord.gg/${invitation.code})`)
                            .setFooter(`Giveaway par ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                }
            } else if(conditionRole != 'Aucune'){
                if(member.roles.cache.find(r => r.id === conditionRole)){
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('GREEN')
                            .setDescription(`<:check:792807778607431730> Vôtre entrée pour [ce giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) à été approuvée. **Bonne chance !**`)
                            .setFooter(`Giveaway par ${reaction.message.author.tag}`)
                            .setTimestamp()
                    )
                    return;
                } else {
                    reaction.users.remove(member.id)
                    let role = reaction.message.guild.roles.cache.find(r => r.id === conditionRole);
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('RED')
                            .setDescription(`<:x_:792807799344070676> Vôtre entrée pour [ce giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) à été refusée. Pour participer, vous devez avoir le rôle \`${role.name}\``)
                            .setFooter(`Giveaway par ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                }
            }
        } else if(lang === 'en'){
            if(conditionServer != 'Aucune'){
                let guild = client.guilds.cache.get(conditionServer);
                if(guild.members.cache.find(m => m.id === member.id)){
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('GREEN')
                            .setDescription(`<:check:792807778607431730> Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been approved. **Good luck !**`)
                            .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                } else {
                    let chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                    let invitation = chx.createInvite({
                        maxAge: 0,
                        maxUses: 0
                    }).catch(console.error);
                    reaction.users.remove(member.id)
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('RED')
                            .setDescription(`<:x_:792807799344070676> Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been denied. To enter, you need to been in [${guild.name}](https://discord.gg/${invitation.code})`)
                            .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                }
            } else if(conditionRole != 'Aucune'){
                if(member.roles.cache.find(r => r.id === conditionRole)){
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('GREEN')
                            .setDescription(`<:check:792807778607431730> Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been approved. **Good luck !**`)
                            .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                } else {
                    reaction.users.remove(member.id)
                    let role = reaction.message.guild.roles.cache.find(r => r.id === conditionRole);
                    member.send(
                        new Discord.MessageEmbed()
                            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
                            .setColor('RED')
                            .setDescription(`<:x_:792807799344070676> Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been denied. To enter, you need the \`${role.name}\` role.`)
                            .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                            .setTimestamp()
                    );
                    return;
                }
            }
        }
        
    });
    client.on("message", async message => {
      let prefixes = require(path.resolve(path.join('..', 'Archimede/database/prefixes.json')));
      let prefix = prefixes[message.guild.id].prefixes;
      if (message.author.bot) return;
      if (!message.content.startsWith(prefix)) return;
    
      const serverQueue = queue.get(message.guild.id);
    
      if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
      } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
      } else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        return;
      }
    });
    
    async function execute(message, serverQueue) {
      const args = message.content.split(" ");
    
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle("<:x_:792807799344070676> ❱ Tu dois etre dans un salon vocal pour jouer de la musique!")
          .setColor('RED')
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle("<:x_:792807799344070676> ❱ J'ai besoin des permissions de rejoindre un salon vocal et de parler !")
          .setColor('RED')
        );
      }
    
      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
       };
    
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };
    
        queue.set(message.guild.id, queueContruct);
    
        queueContruct.songs.push(song);
    
        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          play(message.guild, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle(`<:check:792807778607431730> ❱ \`${song.title}\` a été ajouté a la liste d'attente!`)
          .setColor('GREEN')
          );
      }
    }
    
    function skip(message, serverQueue) {
      if (!message.member.voice.channel)
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle("<:x_:792807799344070676> ❱ Tu dois etre dans un salon vocal pour passer la musique!")
          .setColor('RED')
        );
      if (!serverQueue)
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle("<:x_:792807799344070676> ❱ Il n'y a aucun son a skip!")
          .setColor('RED')
        );
      serverQueue.connection.dispatcher.end();
    }
    
    function stop(message, serverQueue) {
      if (!message.member.voice.channel)
        return message.channel.send(
          new Discord.MessageEmbed()
          .setTitle("<:x_:792807799344070676> ❱ Tu dois etre dans un salon vocal pour stopper la musique!")
          .setColor('RED')
        );
        
      if (!serverQueue)
        return message.channel.send( 
        new Discord.MessageEmbed()
        .setTitle("<:x_:792807799344070676> ❱ Il n'y a aucun son a arreter!")
        .setColor('RED')
        )
        
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
    }
    
    function play(guild, song) {
      const serverQueue = queue.get(guild.id);
      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }
    
      const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      serverQueue.textChannel.send(
        new Discord.MessageEmbed()
        .setTitle(`<:check:792807778607431730> ❱ Commence a jouer \`${song.title}\``)
        .setColor('GREEN')
        );
    }


client.login(token)
