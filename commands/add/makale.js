const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "makale-ekle",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
      const Makale = require("../../models/makale.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){
    var makale = new Makale({
    title : args[0],
    short : args[1],
    long : args[2],
    longdesc : args[3],
    foto1 : args[4],
    ekleyen : message.author.username,
    goruntulenme : 0
    })
    makale.save().then((result)=>{
    const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Makaleyi görmek için tıkla](https://pine-faithful-lan.glitch.me/makale/${result.id})`)
  .addField(`Makale id`,`${result.id}`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });
    })
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
