const client = require("../server.js");

client.on("ready", () =>{
    console.log(`${client.user.tag} is up and ready to go!`)
  client.user.setActivity("Siteyi", { type: "PLAYING" });
});
