const { Message, Client , MessageEmbed} = require("discord.js");
module.exports = {
    name: "haber-güncelle",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
         const Haber = require("../../models/haberler.js");
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){

       if(!args[0]) return message.reply("makale id girmedin")
       if(!args[1]) return message.reply(" Başlık girmedin ")
       if(!args[2]) return message.reply(" Short girmedin ")
        await  Haber.findOneAndUpdate({_id:args[0]},{ title: args[1] , short:args[2] , long:args[3] , longdesc:args[4] , foto1:args[5]}).then((result)=>{
    const exampleEmbed = new MessageEmbed()
  .setColor(`#000000`)
  .setDescription(`[Haberi görmek için tıkla](https://pine-faithful-lan.glitch.me/makale/${result.id})`)
  .addField(`Haber id`,`${result.id}`)
  .setTimestamp()
      
message.channel.send({ embeds: [exampleEmbed] });
    })
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
