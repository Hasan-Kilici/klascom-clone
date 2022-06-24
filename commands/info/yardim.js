const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "yardım",
    aliases: ['p'],

    run: async (client, message, args, ) => {

  const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
    .setThumbnail(message.author.avatarURL())
    .setTitle("Yardım")
   	.addFields(
		{ name: '-info', value:"`Botun bütün bilgilerini verir`", inline: true },
		{ name: '-ping', value:"`Botun ve Sitenin Pingini gösterir`", inline: true },
		{ name: '-site', value:"`Sizi siteye yönlendirir`", inline: true },
    { name : '-say', value:"`Sunucuda Aktif üyeleri ve Üye sayısını gösterir`"}
	)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });

    },
};
