
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
  document.querySelector(".beskrivelse").textContent =  produkt.beskrivelse
    produkt.beskrivelse;
  document.querySelector(".materiale").textContent =
    produkt.materiale;
  document.querySelector(".pris").textContent =
    produkt.pris1 + " DKK" ;
    document.querySelector(".kurven").addEventListener("click", () => {
      location.href = `kurv.html?id=${produkt._id}`;
    });
}
document.querySelector("button").addEventListener("click", () => {
  history.back();
});



hentData();
