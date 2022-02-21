
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
  document.querySelector("h2").textContent = produkt.navn;
  document.querySelector("h4").textContent =
    produkt.beskrivelse;
  document.querySelector("p").textContent =
    produkt.pris1;
}
document.querySelector("button").addEventListener("click", () => {
  history.back();
});

hentData();
