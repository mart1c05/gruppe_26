
// Tager fat i vores URL i Webbroweren
const urlParams = new URLSearchParams(window.location.search);
// Tager fat i ID'et i vores URL Webbroweren
const id = urlParams.get("id");
// Nu kan vi læse det id som står til sidste af URL'er forneden
const url = `https://bomuldsboern-26e2.restdb.io/rest/produkter/${id}`;
const options = {
  headers: {
    "x-apikey": "620f5c4634fd62156585879d",
  },
};

let produkt;

//Henter data fra restDB(database med produkter), Den henter dog kun det produkter som har det sammen ID som foroven.
async function hentData() {
  console.log("hi");
  const responds = await fetch(url, options);
  // place vores objekt i en variable
  produkt = await responds.json();
  console.log(produkt);
  //starter funktionen vis()
  vis();
}

function vis() {
  // placere indholdet i vores tomme section
  document.querySelector(".produkt1").src = produkt.billede2;

  document.querySelector(".navn").textContent = produkt.navn;
  document.querySelector(".beskrivelse").textContent = produkt.beskrivelse;
  produkt.beskrivelse;
  document.querySelector(".materiale").textContent = produkt.materiale;
  document.querySelector(".pris").textContent =
    produkt.pris1 + " kr. " + produkt.pris2 + " kr.";
  produkt.pris1 + " " + produkt.pris2;
  // pager ID'et af produktet over på en ny siden (singleView), hvor vi henter alle infomationerne igen.
  document.querySelector(".kurven").addEventListener("click", () => {
    location.href = `kurv.html?id=${produkt._id}`;
  });
}
// Tilbage knap til den forrige side.
document.querySelector("button").addEventListener("click", () => {
  history.back();
});



hentData();
