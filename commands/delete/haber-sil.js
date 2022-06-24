const { Message, Client , MessageEmbed} = require("discord.js");
module.exports = {
    name: "haber-sil",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
        const Haber = require("../../models/haberler.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){
  
       if(!args[0]) return message.reply("Haber id girmedin")
   let c = await Haber.findByIdAndDelete(args[0]);
       message.reply("Haber silindi :=)")
       
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
