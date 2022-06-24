const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    aliases: ['i'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
const os = require("os");

const osu = require("node-os-utils")

const notSupported = "Bu işletim sistemi uygun değil"

      const full = '█'

      const empty = '░'

      const precision = 20

      

      const freeRAM = os.freemem()

      const usedRAM = os.totalmem() - freeRAM;

      

      const diagramMaker = (used, free) => {

        const total = used + free;

        used = Math.round((used / total) * precision)

        free = Math.round((free / total) * precision)

        return full.repeat(used) + empty.repeat(free)

      }

      

      let cpuUsage;

      

      const p1 = osu.cpu.usage().then(cpuPercentage => {

        cpuUsage = cpuPercentage;

      })

      

      let processes;

      

      const p2 = osu.proc.totalProcesses().then(process => {

        processes = process;

      })

      

      let driveUsed, driveFree;

      

      const p3 = osu.drive.info().then(i => {

        driveUsed = i.usedPercentage;

        driveFree = i.freePercentage;

      }).catch(() => {

        driveUsed = false;

      })

      

      let networkUsage, networkUsageIn, networkUsageOut;

      

      const p4 = osu.netstat.inOut().then(i => {

        networkUsage = i.total;

        networkUsageIn = networkUsage.inputMb;

        networkUsageOut = networkUsage.outputMb;

      }).catch(() => {

        networkUsage = false;

      })

      

      await Promise.all([p1, p2, p3, p4]);

      

      const embed = new MessageEmbed()

        .setColor('#800080')

        .addField(`Ana İstatistikler`,`**Discord.js Sürümü**: ${require("discord.js").version}`)
      .addField(`Ana İstatistikler`,`**Bot ping**: ${client.ws.ping}ms`)

.addField(" **Node.js Sürümü**", `${process.version}`)

        .addField(`Kullanılan:`,(`RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]\n`+

        `CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]\n`+

        `HEXX PROCESS: ${(process.memoryUsage().heapUsed / 1000000).toFixed(2)}MB\n`+

        `Depolama: ${driveUsed ? `${diagramMaker(driveUsed, driveFree)} [${Math.round(driveUsed)}%]` : notSupported}\n`+

        `İşlemler: ${processes != 'not supported'? processes : notSupported}`).trim())

        .addField(`Makine Özellikleri:`,`CPU Sayısı: ${osu.cpu.count()}\nCPU Model: ${os.cpus()[0].model}\nCPU Hızı: ${os.cpus()[0].speed}MHz
${osu.os.platform() != "win32" ? `Depolama: ${diagramMaker(driveUsed,driveFree)} [${driveUsed}%]`: ""}`)

        .addField(`Sistem Özellikleri:`,`Sistem Türü: ${osu.os.type()}\nSistem Mimari: ${osu.os.arch()}\nSistem Platformu: ${osu.os.platform()}`)

        .addField(`İntarnet İstatistikleri:`,`${networkUsage ? `Giriş Hızı: ${networkUsageIn}\nÇıkış hızı: ${networkUsageOut}` : notSupported}`)

        .setTimestamp()

 

        

      message.channel.send({embeds:[embed]});

      

    },
};
