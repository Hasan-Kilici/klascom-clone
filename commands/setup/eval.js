const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    aliases: ['ev'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
     var Makale = require("../../models/haberler.js");
if("sunucusahibiid" == message.author.id){
   if(args[0]){
        try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(çıkış)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}
if(!args[0]){
  message.channel.send("Komut algılanmadı")
}
}else{
  message.channel.send("hmm :? evet buldum , bu komuta erişim sağlanamıyor")
}
 
 
    },
};
