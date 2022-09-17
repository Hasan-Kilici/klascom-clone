const http = require("http");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const { Client, Collection , Discord ,Intents, MessageEmbed} = require("discord.js");
const client = new Client({
intents: 32767,
});
module.exports = client;


client.commands = new Collection(); 
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

const bodyParser = require("body-parser");
const server = http.createServer(app);
const path = require("path");
const events = require("events");
const { Server } = require("socket.io");
const io = new Server({});
const EventEmitter = require("events").EventEmitter;
const em = new EventEmitter();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const port = 3000;
const groupName = "A-O.B.F.C";
//view engine
const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
//Body-parse
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Statik
app.use(express.static("public"));
app.use(express.static("indir"));
app.set("src", "path/to/views");
//MongoDB
//Colections
var Haberler = require("./models/haberler.js");
var Makale = require("./models/makale.js");
var Proje = require("./models/proje.js");
var Girisler = require("./models/girisler.js");
var Kullanici = require("./models/kullanici.js");
var Admin = require("./models/admin.js");
var Banli = require("./models/ban.js");
var Haberyorum = require("./models/haberyorum.js");
var Makaleyorum = require("./models/makaleyorum.js")
//https://www.youtube.com/watch?v=dQw4w9WgXcQ
//mongoDB panel ayarları
const dbURL = "MONGODB URL"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
app.listen(3000, ()=>{
console.log("mongoDB Bağlantı kuruldu");
});
})
.catch((err) => console.log(err));
//mongoDB panel ayarları bitti
app.set("view engine", "ejs");
app.use(morgan("dev"));
//anasayfa
app.get("/", (req, res, err) => {
  var sifre = process.env.AdminKey
Makale.find().sort({ createdAt: -1 }).then((sresult) => {
Proje.find().sort({ createdAt: -1 })
.then((presult) => {
Haberler.find().sort({ createdAt: -1 })
.then((hresult) => {
var cookieControl = req.cookies;
if (cookieControl.giris == "true") {
Kullanici.findOne({_id : req.cookies.id}).then((kkkresult)=>{
res.render(__dirname + "/src/signed/index.ejs", {groupName,makale: sresult,proje: presult,haberler: hresult,kullanici: cookieControl.username,adminKey : req.cookies.adminKey, sifre: sifre,kullanici : req.cookies.username}); 
})
} else {
res.render(__dirname + "/src/pages/index.ejs", {groupName,makale: sresult,proje: presult,haberler: hresult,kullanici: cookieControl.username});
const seviye2 = new MessageEmbed()
.setColor('#ff0000')
.setTitle("Giriş yapıldı!")
.setDescription(`${req.header('x-forwarded-for') || req.connection.remoteAddress}`+" IP'sine sahip kullanıcı giriş yaptı" )
.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986325562282893352").send({ embeds: [seviye2] });
}
})
});
})
.catch((err) => {
console.log(err);
});
});
//İletişim
app.get('/iletisim',(req,res)=>{
res.render(__dirname+"/src/pages/iletisim.ejs")
})
//Kayıt
app.get("/kayit", (req, res) => {
if (req.cookies.giris == "true") {
Makale.find().sort({ createdAt: -1 })
.then((result) => {
Proje.find().sort({ createdAt: -1 })
.then((presult) => {
Haberler.find().sort({ createdAt: -1 })
.then((hresult) => {
res.render(__dirname + "/src/signed/index.ejs", {groupName,makale: result,proje: presult,haberler: hresult,kullanici: req.cookies.username,});
});
});
});
} else {
res.render(__dirname + "/src/pages/kayit.ejs");
}
});
app.get("/giris", (req, res) => {
var sifre = process.env.AdminKey
if (req.cookies.giris == "true") {
Makale.find().sort({ createdAt: -1 })
.then((result) => {
Proje.find().sort({ createdAt: -1 })
.then((presult) => {
Haberler.find().sort({ createdAt: -1 })
.then((hresult) => {
res.render(__dirname + "/src/signed/index.ejs", {groupName,makale: result,proje: presult,haberler: hresult,kullanici: req.cookies.username, sifre : sifre});
});
});
});
} else {
res.render(__dirname + "/src/pages/giris.ejs");
}
});
//Haber görüntüleme
app.get("/haber/:id", (req, res) => {
  const id = req.params.id;
  Haberyorum.find({haberId : req.params.id}).sort({createdAt:-1}).then(async (yresult)=>{
  Haberler.find().limit(4).sort({ createdAt: -1 }).then((sresult) => {
  Haberler.findById(id)
    .then((result) => {
    console.log(yresult)
      res.render(__dirname + "/src/pages/haber.ejs", {yorum : yresult, haber: result, haberler : sresult , giris : req.cookies.giris});
      var goruntulenme = Number(result.goruntulenme);
      goruntulenme++;
      console.log(goruntulenme);
      Haberler.findByIdAndUpdate(id, {goruntulenme: goruntulenme,}).then((hresult) => {
        console.log(hresult);
      })
    })
  })
  })
    .catch((err) => {
      res.render(__dirname + "/src/error/haber.ejs");
    });
});
//Makaleleri görüntüleme
app.get("/makale/:id", (req, res) => {
  const id = req.params.id;
  Makaleyorum.find({makaleId : id}).sort({createdAt : -1}).then((myresult)=>{
  Haberler.find().limit(6).sort().then((mresult)=>{
  Makale.findById(id).then((result) => {
      res.render(__dirname + "/src/pages/makale.ejs", {
        makale: result, yorum : myresult, makaleler : mresult, giris : req.cookies.giris});
      var goruntulenme = Number(result.goruntulenme);
      goruntulenme++;
      console.log(goruntulenme);
      Makale.findByIdAndUpdate(id, {goruntulenme: goruntulenme,}).then((mresult) => {
        console.log(mresult);
      });
    })
  })
  })
    .catch((err) => {
      res.render(__dirname + "/src/error/makale.ejs");
    });
});
//Projeleri görüntüleme
app.get("/proje/:id", (req, res) => {
  const id = req.params.id;
  Proje.findById(id)
    .then((result) => {
      res.render(__dirname + "/src/pages/proje.ejs", {
        proje: result,
        title: "Detay",
      });
      var goruntulenme = Number(result.goruntulenme);
      goruntulenme++;
      console.log(goruntulenme);
      Proje.findByIdAndUpdate(id, {goruntulenme: goruntulenme,}).then((mresult) => {
      console.log(mresult);
      });
    })
    .catch((err) => {
      res.render(__dirname + "/src/error/proje.ejs");
    });
});
//Dashboard
app.get("/admin/dashboard", (req, res) => {
var cookieControl = req.cookies;
Makale.find().sort({ createdAt: -1 })
.then((result) => {
Proje.find().sort({ createdAt: -1 })
.then((presult) => {
Girisler.find().sort({ createdAt: -1 })
.then((gresult) => {
Haberler.find().sort({ createdAt: -1 })
.then((hresult) => {
Haberyorum.find().sort({createdAt: -1}).then((hyresult)=>{
Makaleyorum.find().sort({createdAt : -1}).then((myresult)=>{
if (cookieControl.adminKey == process.env.AdminKey) {
res.render(__dirname + "/src/admin/dashboard.ejs", {groupName,makales: result,proje: presult,girisler: gresult,haberler: hresult, hyorum : hyresult,myorum:myresult});
} else if (cookieControl.adminKey == process.env.StaffKey) {
res.render(__dirname + "/src/staff/dashboard.ejs", {groupName,makales: result,proje: presult,girisler: gresult,haberler: hresult, hyorum : hyresult});
} else {
res.render(__dirname + "/src/admin/giris-yap.ejs", {groupName,makales: result,makale: result,proje: presult,girisler: gresult,haberler: hresult, hyorum : hyresult});
}
})
})
});
});
})
.catch((err) => {
console.log(err);
});
});
});
//Hesap oluşturma
app.post("/kayit-ol", (req, res) => {
  Kullanici.findOne({ kullanici_adi: req.body.username }, (err, user) => {
    if (user) {
      res.send("Bu isim kullanılmakta");
    } else {
      const kullanici = new Kullanici({
        kullanici_adi: req.body.username,
        sifre: req.body.sifre,
        gmail: req.body.gmail,
      });
      kullanici.save().then((result) => {console.log("Hesap oluşturuldu");});
        const seviye3 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Yeni Kullanıcı!")
  .addField("Kullanıcı adı",`${req.body.username}`)
  .addField("Gmail",`${req.body.gmail}`)
  .addField("Şifre",`${req.body.sifre}`)
  .addField("IP",`${req.header('x-forwarded-for') || req.connection.remoteAddress}`)
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986775854950543403").send({ embeds: [seviye3] });
res.render(__dirname + '/src/pages/giris.ejs')
}
});
});
//Giriş yapma
app.post("/giris-yap", (req, res) => {
  var kullanici_adi = req.body.username;
  var sifre = req.body.sifre;
  Kullanici.find({kullanici_adi: kullanici_adi, sifre : sifre}).then((result)=>{
  Kullanici.findOne({ kullanici_adi: kullanici_adi, sifre: sifre },(err, user) => {
if (user) {
res.cookie("username", kullanici_adi);
res.cookie("giris", "true");
res.render(__dirname + "/src/pages/giris-basarili.ejs")
}
if (err) {console.log(err)}
if (!user) {res.render(__dirname + "/src/error/kullanici.ejs");}
})
res.cookie("id",result[0]._id)
})
});
//Admin
app.post("/admin-giris", (req, res) => {
  var kullanici_adi = req.body.username;
  var sifre = req.body.sifre;
  Admin.findOne({ kullanici_adi: kullanici_adi, sifre: sifre },(err, aduser) => {
      if (aduser) {
        res.cookie("username", kullanici_adi);
        res.cookie("adminKey", process.env.AdminKey);
        res.cookie("giris", "true");
        res.render(__dirname + "/src/admin/giris.ejs");
      } else {
        res.render(__dirname + "/src/error/admin.ejs");
              const seviye3 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("HATALI GİRİŞ!")
  .setDescription("Bir orospu çocuğu panele erişmeye çalışıyor!")
  .addField("IP adresi",`${req.header('x-forwarded-for') || req.connection.remoteAddress}`)
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986756808548966400").send({ embeds: [seviye3] });
      }
    }
  );
});
//Oy verme
app.post('/upvote/:id',(req,res)=>{
const id = req.params.id;
  Makaleyorum.find({makaleId : id}).sort({createdAt : -1}).then((myresult)=>{
  Haberler.find().limit(6).sort().then((mresult)=>{
  Makale.findById(id).then((result) => {
      res.render(__dirname + "/src/pages/makale.ejs", {
        makale: result, yorum : myresult, makaleler : mresult, giris : req.cookies.giris});
      var upvote = Number(result.upvote);
      upvote++;
      console.log(upvote);
      Makale.findByIdAndUpdate(id, {upvote: upvote,}).then((mresult) => {
        console.log(mresult);
      });
    })
  })
  })
})
app.post('/downvote/:id',(req,res)=>{
const id = req.params.id;
  Makaleyorum.find({makaleId : id}).sort({createdAt : -1}).then((myresult)=>{
  Haberler.find().limit(6).sort().then((mresult)=>{
  Makale.findById(id).then((result) => {
      res.render(__dirname + "/src/pages/makale.ejs", {
        makale: result, yorum : myresult, makaleler : mresult, giris : req.cookies.giris});
      var downvote = Number(result.downvote);
      downvote++;
      console.log(downvote);
      Makale.findByIdAndUpdate(id, {downvote : downvote}).then((mresult) => {
        console.log(mresult);
      });
    })
  })
  })
})
//Yorum ekleme
//Haberler
app.post('/haber/yorum-ekle/:id',(req,res)=>{
Haberler.findById(req.params.id).then((ssssresult)=>{
var Yorum = new Haberyorum ({
kullanici_adi:req.cookies.username,
haber:ssssresult.title,
haberId:req.params.id,
mesaj:req.body.mesaj
})
Yorum.save().then((result)=>{
  const id = req.params.id;
  Haberyorum.find({haberId : req.params.id}).sort({createdAt:-1}).then(async (yresult)=>{
  Haberler.find().limit(4).sort({ createdAt: -1 }).then((sresult) => {
  Haberler.findById(id)
    .then((result) => {
    console.log(yresult)
      res.render(__dirname + "/src/pages/haber.ejs", {yorum : yresult, haber: result, haberler : sresult , giris : req.cookies.giris});
      var goruntulenme = Number(result.goruntulenme);
      goruntulenme++;
      console.log(goruntulenme);
      Haberler.findByIdAndUpdate(id, {goruntulenme: goruntulenme,}).then((hresult) => {
        console.log(hresult)
      })
    })
  })
  })
})
})
})
//Makaleler
app.post('/makale/yorum-ekle/:id',(req,res)=>{
Makale.findById(req.params.id).then((ssssresult)=>{
var Yorum = new Makaleyorum ({
kullanici_adi:req.cookies.username,
makaleId:req.params.id,
makale : ssssresult.title,
mesaj:req.body.mesaj
})
Yorum.save().then((result)=>{
  const id = req.params.id;
  Makaleyorum.find({makaleId : id}).sort({createdAt : -1}).then((myresult)=>{
  Haberler.find().limit(6).sort().then((mresult)=>{
  Makale.findById(id).then((result) => {
      res.render(__dirname + "/src/pages/makale.ejs", {
        makale: result, yorum : myresult, makaleler : mresult, giris : req.cookies.giris});
      var goruntulenme = Number(result.goruntulenme);
      goruntulenme++;
      console.log(goruntulenme);
      Makale.findByIdAndUpdate(id, {goruntulenme: goruntulenme,}).then((mresult) => {
        console.log(mresult);
      });
    })
  })
  })
})
})
})
//IP'yi yasakla

//Haber ekleme
app.post("/add-new", (req, res) => {
  const haberler = new Haberler({
    title: req.body.htitle,
    short: req.body.hshort,
    long: req.body.hlong,
    goruntulenme: 0,
  });
  haberler.save()
    .then((result) => {
      res.render(__dirname + "/src/ekle/haber.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
      const seviye2 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Haber eklendi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili **"+`${req.body.htitle}`+"** Haberini ekledi")
  .addField("Görüntüle","[Link](https://pine-faithful-lan.glitch.me/haber/"+`${haberler.id}`+")")
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
setTimeout(()=>{
  const seviye3 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Haber eklendi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili **"+`${req.body.htitle}`+"** Haberini ekledi")
  .addField("Görüntüle","[Link](https://pine-faithful-lan.glitch.me/haber/"+`${haberler.id}`+")")
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986345804040114207").send({ embeds: [seviye3] });
},100)
});
//Makale ekleme
app.post("/add-blog", (req, res) => {
  var cerez = req.cookies;
  const makale = new Makale({
    title: req.body.title,
    short: req.body.short,
    long: req.body.long,
    goruntulenme: 0,
    ekleyen: cerez.username,
    foto1:false,
    ornek1:false,
    ornek2:false,
    ornek3: false,
    upvote: 0,
    downvote : 0,
  });
  makale.save()
  .then((result) => {
      res.render(__dirname + "/src/ekle/makale.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
    const seviye2 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Makale eklendi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili **"+`${req.body.title}`+"** Makalesini ekledi" )
  .addField("Görüntüle","[Link](https://pine-faithful-lan.glitch.me/makale/"+`${makale.id}`+")")
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
});
//Proje Ekleme
app.post("/add-project", async (req, res) => {
  const proje = new Proje({
    title: req.body.ptitle,
    short: req.body.pshort,
    long: req.body.plong,
    goruntulenme: 0,
    upvote: 0,
    sahibi: req.cookies.username,
  });
  proje.save()
    .then((result) => {
      res.render(__dirname + "/src/ekle/proje.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
     const seviye2 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Proje eklendi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili **"+`${req.body.ptitle}`+"** adlı Projesini ekledi")
  .addField("Görüntüle","[Link](https://pine-faithful-lan.glitch.me/proje/"+`${proje.id}`+")")
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
  setTimeout(()=>{
  const seviye3 = new MessageEmbed()
	.setColor('#000000')
  .setTitle("Proje eklendi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili **"+`${req.body.ptitle}`+"** adlı Projesini ekledi")
  .addField("Görüntüle","[Link](https://pine-faithful-lan.glitch.me/proje/"+`${proje.id}`+")")
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986345893903093810").send({ embeds: [seviye3] });
},100)
});
//Yorum silme
app.post("/haber-yorum-sil/:id", (req, res) => {
  const id = req.params.id;
  Haberyorum.findByIdAndDelete(id)
    .then((result) => {
      res.render(__dirname + "/src/sil/yorum.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/makale-yorum-sil/:id", (req, res) => {
  const id = req.params.id;
  Makaleyorum.findByIdAndDelete(id)
    .then((result) => {
      res.render(__dirname + "/src/sil/yorum.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
})
//Haber silme
app.post("/delete-new/:id", (req, res) => {
  const id = req.params.id;
  Haberler.findByIdAndDelete(id)
    .then((result) => {
      res.render(__dirname + "/src/sil/haber.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
  const seviye2 = new MessageEmbed()
	.setColor('#ff0000')
  .setTitle("Haber silindi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili Bir Haber sildi" )
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
});
//Makale silme
app.post("/delete-makale/:id", (req, res) => {
  const id = req.params.id;
  Makale.findByIdAndDelete(id)
    .then((result) => {
      Makale.find({ id: id });
      res.render(__dirname + "/src/sil/makale.ejs", {
        title: "Makale silindi",
      });
    })
    .catch((err) => {
      console.log(err);
    });
    const seviye2 = new MessageEmbed()
	.setColor('#ff0000')
  .setTitle("Makale silindi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili Makale sildi" )
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
});
//Proje Silme
app.post("/delete-proje/:id", (req, res) => {
  const id = req.params.id;
  Proje.findByIdAndDelete(id)
    .then((result) => {
      res.render(__dirname + "/src/sil/proje.ejs", { title: "Proje silindi" });
    })
    .catch((err) => {
      console.log(err);
    });
      const seviye2 = new MessageEmbed()
	.setColor('#ff0000')
  .setTitle("Proje silindi!")
  .setDescription(`${req.cookies.username }`+" isimli Yetkili Bir Proje sildi" )
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986312887461113879").send({ embeds: [seviye2] });
});
//Haber düzenleme
app.post("/edit-new/:id", (req, res) => {
  const id = req.params.id;
  Haberler.findById(id).then((result) => {
    res.render(__dirname + "/src/admin/edit-haber", { haberler: result });
  });
});
app.post("/editNew/:id", (req, res) => {
  const id = req.params.id;
  Haberler.findByIdAndUpdate(id, {
    title: req.body.title,
    short: req.body.short,
    long: req.body.long,
    longdesc: req.body.longdesc,
    foto: req.body.foto,
    link: req.body.link,
  }).then((result) => {
    console.log("Haber düzenlendi");
    res.render(__dirname + "/src/guncelle/haber.ejs");
  });
});
//Makale düzenleme
app.post("/edit-makale/:id", (req, res) => {
  const id = req.params.id;
  Makale.findById(id).then((result) => {
    res.render(__dirname + "/src/admin/edit-makale", { makale: result });
  });
});
app.post("/editMakale/:id", (req, res) => {
  const id = req.params.id;
  Makale.findByIdAndUpdate(id, {
    title: req.body.title,
    short: req.body.short,
    long: req.body.long,
    longdesc: req.body.longdesc,
    foto1: req.body.foto1,
    foto2: req.body.foto2,
    ornek1 : req.body.ornek1,
    ornek2 : req.body.ornek2,
    ornek3 : req.body.ornek3,
  }).then((result) => {
    console.log("Makale güncellendi");
    res.render(__dirname + "/src/guncelle/makale.ejs");
  });
});
//Proje düzenleme
app.post("/edit-proje/:id", (req, res) => {
  const id = req.params.id;
  Proje.findById(id).then((result) => {
    res.render(__dirname + "/src/admin/edit-proje.ejs", { proje: result });
  });
});
app.post("/editProje/:id", (req, res) => {
  const id = req.params.id;
  Proje.findByIdAndUpdate(id, {
    title: req.body.title,
    short: req.body.short,
    long: req.body.long,
    link: req.body.link,
  }).then((result) => {
    console.log("Proje güncellendi");
    res.render(__dirname + "/src/guncelle/proje.ejs");
  });
});
app.post('/iletisim',(req,res)=>{
 const seviye2 = new MessageEmbed()
	.setColor('#ff0000')
  .setTitle("İletişim")
  .addField("Kullanıcı adı",req.body.username)
  .addField("Gmail",req.body.gmail)
  .addField("Mesaj",req.body.mesaj)
  .addField("IP",`${req.header('x-forwarded-for') || req.connection.remoteAddress}`)
	.setTimestamp()

client.guilds.cache.get("986312887461113876").channels.cache.get("986457465866559518").send({ embeds: [seviye2] });
res.render(__dirname + "/src/ekle/iletisim.ejs")
})

client.login("Discord bot token");
