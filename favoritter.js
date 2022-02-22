/* let produkt = sessionStorage.getItem("favorit"); */
//henter vores string, som tidligere var en Array. Den laves derefter om til en Array igen.
let favoritter = JSON.parse(sessionStorage.getItem("favoritter"));
const spand = document.querySelectorAll(".spand");
const foldbnt = document.querySelector(".foldout");
const filterKnapper = document.querySelectorAll("nav button");
let filter = "alle";

console.log(favoritter);

  
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerTøj));

 function filtrerTøj() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  console.log(filter);
  printud(favoritter);

}



function printud(favoritter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  data.textContent = "";

  favoritter.forEach((item) => {
    console.log(item);
    if (filter == item.kategori || filter == "alle") {
      const klon = tøjTemplate.cloneNode(true).content;
      klon.querySelector("h3").textContent = item.navn;
      klon.querySelector("img").src = item.billede1;
      klon.querySelector("p").textContent =
        item.pris1 + "kr. " + item.pris2 + "kr.";
      //når spanden klikkes, start annonym(arrow funktion) funktion
      klon.querySelector(".spand").addEventListener("click", () => {
        // finder id'et af den valgte spand
        let id = favoritter.indexOf(item);
        console.log(id);
        //fjerner alt imellem vores valgt id os så en index frem. Altså kun den valgte spand fjernes fra listen.
        favoritter.splice(id, 1);
        console.log(favoritter);
        //Tilføjer vores array favorit til sessionStorage
        sessionStorage.setItem("favoritter", JSON.stringify(favoritter));
        // reloader vores side for de viste produkter bliver opdateret.
        window.location.reload();
      });
      data.appendChild(klon);
    }
  });
}

// toggler klassen none på knappen filter
function foldOut() {
  console.log("hi");
  foldbnt.classList.toggle("none");
}


printud(favoritter);

