const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {

const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return message.channel.send(`<:x_:792515458749956116> ❱ Les données n'éxistent pas ou les données n'ont pas encore été collectées`)
        }

        const embed = new MessageEmbed()
            .setTitle(args[0] ? `${args[0].toUpperCase()} Statistiques` : '<:covid:793837698988638209> ❱ Statistiques Covid')
            .setDescription(`*Voici toutes les statistiques Covid dans le \`monde\`, chaque jour cette page s'actualiseras*`)
            .setColor('#2f3136')
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif') 
            .addFields(
                {
                    name: '<:covid19:792609235237339147>  Total des Cas',
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Total des Décès',
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Total des Rescapés',
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Cas Actifs',
                    value: corona.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Cas Critiques',
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Récupération Aujourd\'hui',
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: '<:covid19:792609235237339147>  Décédés Aujourd\'hui',
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(embed)
}

module.exports.help = {
    name: 'covid'
}