const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "proje-ekle",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
      const Proje = require("../../models/proje.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){
    var proje = new Proje({
    title : args[0],
    short : args[1],
    long : args[2],
    longdesc : args[3],
    foto : args[4],
    sahibi : message.author.username,
    goruntulenme : 0
    })
    proje.save().then((result)=>{
    const exampleEmbed1 = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Makaleyi görmek için tıkla](https://pine-faithful-lan.glitch.me/proje/${result.id})`)
  .addField(`Proje`,`${result.id}`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed1] });
  setTimeout(()=>{
  const exampleEmbed = new MessageEmbed() //
  .setTitle("Proje Eklendi!")
  .setColor(`#000000`)
  .setDescription(`${message.author.username} adlı yetkili **[${result.title}](https://pine-faithful-lan.glitch.me/haber/${result.id})** Projesini ekledi`)
  .setTimestamp()
      
client.guilds.cache.get("986312887461113876").channels.cache.get("986345893903093810").send({ embeds: [exampleEmbed] });  
},100)
    })
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
