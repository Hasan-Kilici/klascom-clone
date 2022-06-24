window.scroll({
behavior: 'smooth'
});
//Navbar
function navOpen() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
function closeNav(){
  var x = document.getElementById("myTopnav");
  x.className = "topnav";
}
//Set Jumbotron Text
setInterval(()=>{
if(document.getElementById("textAn").innerHTML == "işte projelerimiz"){
document.getElementById("textAn").innerHTML = "işte ekibimiz";
} else {
document.getElementById("textAn").innerHTML = "işte projelerimiz";  
}},6000);
//Navbar - Scroll functions
function group(){window.scrollTo(0, 280);}
function projects(){window.scrollTo(0, 660);}
function about(){window.scrollTo(0, 0);}
function kurumsal(){window.scrollTo(0, 680);}
//Slider
var slide = 100;
setInterval(()=>{
if(slide > 600){
slide = 0;
document.getElementById("slider").scrollTo(0,0)
} else {
slide = slide + 100;
document.getElementById("slider").scrollTo(slide,0)
}
console.log(slide);
return slide;
},10000)

