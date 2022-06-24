const { Message, Client , MessageEmbed} = require("discord.js");
module.exports = {
    name: "makale-sil",
    aliases: ['ma'],

    run: async (client, message, args, ) => {
      const Makale = require("../../models/makale.js")
     if( client.guilds.cache.get("986312887461113876").members.cache.get(message.author.id).roles.cache.get("986312938933596191")){
  
       if(!args[0]) return message.reply("Makale id girmedin")
   let c = await Makale.findByIdAndDelete(args[0]);
       message.reply("makale silindi :=)")
       
     } else {
       message.reply("yetersiz yetki")
     }
    },
};
