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

async function hentData() {
  console.log("hentdata");
  const resultat = await fetch(url, options);

  produkter = await resultat.json();
  console.log("Produkter", produkter);
  vis(produkter);
}
hentData();

function vis(json) {
  console.log(json);
}

function vis(produkter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  data.textContent = "";
  produkter.forEach((item) => {
    console.log("Kategori", item.kategori);
    if (filter == item.kategori || filter == "alle") {
      const klon = tøjTemplate.cloneNode(true).content;
      klon.querySelector("h3").textContent = item.navn;
      klon.querySelector("img").src = item.billede1;

      klon.querySelector("p").textContent =
        item.pris1 + "kr. " + item.pris2 + "kr.";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(item));
      data.appendChild(klon);
    }
  });

  // function visDetaljer(item) {
  //   console.log(ret);
  //   popup.style.display = "block";
  //   popup.querySelector("h2").textContent = ret.navn;
  //   popup.querySelector("img").src =
  //     "medium/" + ret.billednavn + "-md.jpg";
  //   popup.querySelector(".popup_beskrivelse").textContent =
  //     ret.langbeskrivelse;
  //   popup.querySelector(".popup_pris").textContent =
  //     "Pris: " + ret.pris + ",-";
  //   popup.querySelector(".popup_region").textContent =
  //     ret.oprindelsesregion;
  //     // }
  //     document
  //       .querySelector("#luk")
  //       .addEventListener("click", () => (popup.style.display = "none"));
}

function foldOut() {
  console.log("hi");
  foldbnt.classList.toggle("none");
}
