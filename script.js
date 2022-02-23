/** ---------- VARIABLER ---------- */ 

const header = document.querySelector("header h2");
const url = "https://bomuldsboern-26e2.restdb.io/rest/produkter";
const options = {
  headers: { "x-apikey": "620f5c4634fd62156585879d" },
};

const foldbnt = document.querySelector(".foldout");
const filterKnapper = document.querySelectorAll("nav button");

document.addEventListener("DOMContentLoaded", start);
let produkter;
let filter = "alle";
let favoritter = [];
let kurv = [];
let hjertID = []

/** ---------- START OG FILTER FUNKTION ---------- */ 

function start() {
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerTøj));
  //loadJSON();
}
function filtrerTøj() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  console.log(filter);
  vis(produkter);
  /* header.textContent = this.textContent; */
}

/** ---------- HENTDATA FRA RESTDB ---------- */ 

async function hentData() {
  console.log("hentdata");
  const resultat = await fetch(url, options);

  produkter = await resultat.json();
  console.log("Produkter", produkter);
  vis(produkter);
  /* hearts(produkter) */
}
hentData();

function vis(json) {
  console.log(json);
}

/** ---------- FREMKALD ALLE PRODUKTER ---------- */ 

function vis(produkter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  if (favoritter === null) {
    let favoritter = JSON.parse(localStorage.getItem("favoritter"));
  } 


  

  data.textContent = "";

  produkter.forEach((item) => {
    console.log("Kategori", item.kategori);
    if (filter == item.kategori || filter == "alle") {
      const klon = tøjTemplate.cloneNode(true).content;
      klon.querySelector("h3").textContent = item.navn;
      klon.querySelector("img").src = item.billede1;

      klon.querySelector("p").textContent =
        item.pris1 + "kr. " + item.pris2 + "kr.";

      //eventlistenerder peger hen på en ny side. det tager id'et med som vi så kan hante i det nye script

      klon.querySelector("img").addEventListener("click", () => {
        location.href = `singleview.html?id=${item._id}`;
      });
      klon.querySelector(".tomt_heart").addEventListener("click", () => {
        console.log("works");
        //pusher til et nyt array.
        favoritter.push(item);
        // tilføjer favoritter til sessionStorage, så vi kan hente det på en nyside.
        localStorage.setItem("favoritter", JSON.stringify(favoritter));
      });
      klon.querySelector(".full_heart").addEventListener("click", () => {
        //pusher til et nyt array.
        favoritter.pop(item);
        // tilføjer favoritter til sessionStorage, så vi kan hente det på en nyside.
        localStorage.setItem("favoritter", JSON.stringify(favoritter));
      });
      data.appendChild(klon);
    }
  });





/** ---------- FAVORIT HJERTER - TOGGLE KLASSE ---------- */

  const tomt = document.querySelectorAll(".tomt_heart");
  const fyldt = document.querySelectorAll(".full_heart");
  let checkClass = JSON.parse(localStorage.getItem("hjertID"));
  
  if (checkClass === null) {
    console.log("hjerte is NULL");
    localStorage.setItem("hjertID", JSON.stringify(hjertID));
  }
  hjertID = JSON.parse(localStorage.getItem("hjertID"));


  // for hver fyldthjærte er der en EventListener.
  fyldt.forEach((e, i) => {
    e.addEventListener("click", () => {
      console.log("fyldthjærte");
      // Det valgte hjærte for "toggle" klassen displaynone, der for den til at forsvinde eller dukke frem.
      e.classList.toggle("displaynone");
      // "i" er vores valgte hjærtes ID, den brugest til finde det tommehjærte i array'en "tomt" der matcher med den vi har klikket på
      // derefter toggler vi klassen displaynone, der for den til at forsvinde eller dukke frem.
      tomt[i].classList.toggle("displaynone");
      let id = hjertID.indexOf(i)

      hjertID.splice(id, 1);
      localStorage.setItem("hjertID", JSON.stringify(hjertID));
      console.log(hjertID)
    });
  });

  // denne "arrow function" gør der samme sam den ovenfor, men omvendt.
  tomt.forEach((e, i) => {
    e.addEventListener("click", () => {
      console.log("tomthjærte");
      e.classList.toggle("displaynone");
      fyldt[i].classList.toggle("displaynone");
      hjertID.push(i)
      localStorage.setItem("hjertID", JSON.stringify(hjertID));
      console.log(hjertID);
    });
  });




if (checkClass.length > 0) {

  console.log(checkClass + "butthole")
  let addclass = Array.from(checkClass)
  console.log(addclass)

  addclass.forEach((e) => {
    fyldt[e].classList.toggle("displaynone")
    tomt[e].classList.toggle("displaynone")
  })
}

}



/** ---------- FILTERMENU KNAP ---------- */ 

// toggler klassen none på knappen filter
function foldOut(produkter) {
  console.log("hi");
  foldbnt.classList.toggle("none");
}

























/* function hearts() {
  // if/else statement til at vide om hjærterne er blivet valgt
  let checkFav = localStorage.getItem("favoritter", JSON.stringify(favoritter));
  console.log(checkFav + " checkfav liste");
  if (checkFav === null) {
    console.log("there is nothing in here");
    console.log(checkFav + " checkfav liste");
  } else {
    console.log("Stuff has been picked" + checkFav);

    var intersection = checkFav.filter(function (e) {
      return produkter.indexOf(e) > -1;
    });

    console.log(intersection)
  }
} */
