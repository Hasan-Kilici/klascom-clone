const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],

    run: async (client, message, args, ) => {
  const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`**${client.ws.ping }ms**`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });

    },
};
