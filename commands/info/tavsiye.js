const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "tavsiye",
    aliases: ['p'],

    run: async (client, message, args, ) => {
  let fullArgs = args.slice(0).join(' ');
  const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`${message.author.username} Bir tavsiyede bulundu`)
  .addField(`Tavsiye`,`${fullArgs} `)
  .setTimestamp()
client.guilds.cache.get("986312887461113876").channels.cache.get("987467333704486922").send({ embeds: [exampleEmbed] });

    },
};
