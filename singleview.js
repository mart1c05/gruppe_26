
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://bomuldsboern-26e2.restdb.io/rest/produkter/${id}`;
const options = {
  headers: {
    "x-apikey": "620f5c4634fd62156585879d",
  },
};

let produkt;

async function hentData() {
  console.log("hi");
  const responds = await fetch(url, options);
  produkt = await responds.json();
  console.log(produkt);
  vis();
}

function vis() {
  document.querySelector(".produkt1").src = produkt.billede2;
  
  document.querySelector(".navn").textContent = produkt.navn;
  document.querySelector(".beskrivelse").textContent =
    produkt.beskrivelse;
  document.querySelector(".materiale").textContent =
    produkt.materiale;
  document.querySelector(".pris").textContent =
<<<<<<< HEAD
    produkt.pris1 + " kr. " + produkt.pris2 + " kr.";
=======
    produkt.pris1 + " " + produkt.pris2;
    document.querySelector(".buy").addEventListener("click", () => {
      location.href = `kurv.html?id=${produkt._id}`;
    });
>>>>>>> ac9d3918e34d8d78a30dd5c4ea2b1ce35dcc4f94
}
document.querySelector("button").addEventListener("click", () => {
  history.back();
});



hentData();
