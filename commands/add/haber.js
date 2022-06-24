const { Message, Client , MessageEmbed} = require("discord.js");

module.exports = {
    name: "haber-ekle",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
      const Haber = require("../../models/haberler.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){
    var haber = new Haber({
    title : args[0],
    short : args[1],
    long : args[2],
    longdesc : args[3],
    foto : args[4],
    goruntulenme : 0
    })
    haber.save().then((result)=>{
    const exampleEmbed1 = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Makaleyi görmek için tıkla](https://pine-faithful-lan.glitch.me/haber/${result.id})`)
  .addField(`Haber`,`${result.id}`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed1] });
      setTimeout(()=>{
    const exampleEmbed = new MessageEmbed() //
  .setTitle("Haber Eklendi!")
  .setColor(`#000000`)
  .setDescription(`${message.author.username} adlı yetkili **[${result.title}](https://pine-faithful-lan.glitch.me/haber/${result.id})** Haberini ekledi`)
  .setTimestamp()
      
client.guilds.cache.get("986312887461113876").channels.cache.get("986345804040114207").send({ embeds: [exampleEmbed] });  
},100)
    })
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
