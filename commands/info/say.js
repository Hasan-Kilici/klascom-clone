const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "say",
    aliases: ['p'],

    run: async (client, message, args, ) => {
  var online = Number(`${message.guild.members.cache.filter(m => !m.user.bot && m.presence?.status === 'online').size}`)+Number(`${message.guild.members.cache.filter(m => !m.user.bot && m.presence?.status === 'dnd').size}`)+Number(`${message.guild.members.cache.filter(m => !m.user.bot && m.presence?.status === 'idle').size}`)
  const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
    .setTitle("Yardım")
   	.addFields(
		{ name: 'Kullanıcı sayısı', value:`${message.guild.memberCount}`, inline: true },
		{ name: 'Sesdeki Kullanıcı sayısı', value:`${message.guild.members.cache.filter(m => m.voice.channel).size}`, inline: true },
		{ name: 'Online Kullanıcı sayısı', value:`${online}`, inline: true },
	)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });

    },
};
