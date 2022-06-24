const { Message, Client , MessageEmbed} = require("discord.js");
module.exports = {
    name: "proje-güncelle",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
      const Proje = require("../../models/proje.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){

       if(!args[0]) return message.reply("makale id girmedin")
       if(!args[1]) return message.reply(" Başlık girmedin ")
       if(!args[2]) return message.reply(" Short girmedin ")
        await  Proje.findOneAndUpdate({_id:args[0]},{ title: args[1] , short:args[2] , long:args[3] , longdesc:args[4] , foto1:args[5]}).then((result)=>{
    const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Projeyi görmek için tıkla](https://pine-faithful-lan.glitch.me/proje/${result.id})`)
  .addField(`Makale id`,`${result.id}`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });
    })
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
