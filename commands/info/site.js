const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "site",
    aliases: ['p'],

    run: async (client, message, args, ) => {
  const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Web sitesine gitmek için Tıkla](https://pine-faithful-lan.glitch.me/)`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });

    },
};
