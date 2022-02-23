/** ---------- VARIABLER ---------- */

const header = document.querySelector("header h2");
// url og option er  vores login informationer til restdb(database med produkter)
const url = "https://bomuldsboern-26e2.restdb.io/rest/produkter";
const options = {
  headers: { "x-apikey": "620f5c4634fd62156585879d" },
};

const foldbnt = document.querySelector(".foldout");
const filterKnapper = document.querySelectorAll("nav button");

let produkter;
let filter = "alle";
let favoritter = [];
let kurv = [];
let hjertID = [];
// når siden loads starter "start" funktionen.
document.addEventListener("DOMContentLoaded", start);
/** ---------- START OG FILTER FUNKTION ---------- */

function start() {
  // For hvert knap starter vi en funktion, når den klikkes.
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerTøj));
  //loadJSON();
  hentData();
}
function filtrerTøj() {
  //sætter filter = det der står på knappen som der blev trykket på.
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  console.log(filter);
  vis(produkter);
  /* header.textContent = this.textContent; */
}

/** ---------- HENTDATA FRA RESTDB ---------- */

// henter vores Produkter fra restDB (database med produkter)
async function hentData() {
  console.log("hentdata");
  const resultat = await fetch(url, options);
  // sætter arrayen med produkter til variablen "produkter"
  produkter = await resultat.json();
  console.log("Produkter", produkter);
  // starter funktionen vis()
  vis(produkter);
  /* hearts(produkter) */
}

/** ---------- FREMKALD ALLE PRODUKTER ---------- */

function vis(produkter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  // Usikker på om denne if/else statement gør noget men tør ikke fjerne den.

  if (JSON.parse(localStorage.getItem("favoritter")) === null) {
    localStorage.setItem("favoritter", JSON.stringify(favoritter));
    console.log("is null");
  } else {
    favoritter = JSON.parse(localStorage.getItem("favoritter"));
    console.log(favoritter);
  }

  // Tømmer Alt Indhold inde i data
  data.textContent = "";

  produkter.forEach((item) => {
    console.log("Kategori", item.kategori);
    // tager fat i vores template og siger at vi gerne vil klone den.
    if (filter == item.kategori || filter == "alle") {
      const klon = tøjTemplate.cloneNode(true).content;
      klon.querySelector("h3").textContent = item.navn;
      klon.querySelector("img").src = item.billede1;

      klon.querySelector("p").textContent = item.pris2 + "kr.";

      // pager ID'et af produktet over på en ny siden (singleView), hvor vi henter alle infomationerne igen.
      klon.querySelector("img").addEventListener("click", () => {
        location.href = `singleview.html?id=${item._id}`;
      });

      // EventListener på hjertet, den stater en annonym ("arrow function") funktion
      klon.querySelector(".tomt_heart").addEventListener("click", () => {
        console.log("works");
        //pusher til et nyt array.
        favoritter.push(item);
        // tilføjer favoritter til sessionStorage, så vi kan hente det på en nyside.
        localStorage.setItem("favoritter", JSON.stringify(favoritter));
        console.log(favoritter);
      });
      klon.querySelector(".full_heart").addEventListener("click", () => {
        //fjerner fra array et.
        let id2 = produkter.indexOf(item);

        favoritter.splice(id2, 1);
        console.log(id2)
        // tilføjer favoritter til sessionStorage, så vi kan hente det på en nyside.
        localStorage.setItem("favoritter", JSON.stringify(favoritter));
      });
      // tilføjer indholdet for hvert produkt til vores tomme section.
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
      let id = hjertID.indexOf(i);
      hjertID.splice(id, 1);
      localStorage.setItem("hjertID", JSON.stringify(hjertID));
      console.log(hjertID);
    });
  });

  // denne "arrow function" gør der samme sam den ovenfor, men omvendt.
  tomt.forEach((e, i) => {
    e.addEventListener("click", () => {
      console.log("tomthjærte");
      e.classList.toggle("displaynone");
      fyldt[i].classList.toggle("displaynone");
      hjertID.push(i);
      localStorage.setItem("hjertID", JSON.stringify(hjertID));
      console.log(hjertID);
    });
  });

  if (checkClass.length > 0) {
    console.log(checkClass + "butthole");
    let addclass = Array.from(checkClass);
    console.log(addclass);

    addclass.forEach((e) => {
      fyldt[e].classList.toggle("displaynone");
      tomt[e].classList.toggle("displaynone");
    });
  }
}

/** ---------- FILTERMENU KNAP ---------- */

// toggler klassen none på knappen filter
function foldOut(produkter) {
  console.log("hi");
  foldbnt.classList.toggle("none");
}
