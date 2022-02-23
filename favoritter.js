
//henter vores string, som tidligere var en Array. Den laves derefter om til en Array igen.
let favoritter = JSON.parse(localStorage.getItem("favoritter"));


const spand = document.querySelectorAll(".spand");
const foldbnt = document.querySelector(".foldout");
const filterKnapper = document.querySelectorAll("nav button");
let filter = "alle";


console.log(favoritter);

// For hvert knap starter vi en funktion, når den klikkes.
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerTøj));

function filtrerTøj() {
  //sætter filter = det der står på knappen som der blev trykket på.
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  console.log(filter);
  printud(favoritter);
}

function printud(favoritter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  hjertID = JSON.parse(localStorage.getItem("hjertID"));

  // Tømmer Alt Indhold inde i data
  data.textContent = "";

  favoritter.forEach((item) => {
    console.log(item);
    if (filter == item.kategori || filter == "alle") {
      // tager fat i vores template og siger at vi gerne vil klone den.
      const klon = tøjTemplate.cloneNode(true).content;
      klon.querySelector("h3").textContent = item.navn;
      klon.querySelector("img").src = item.billede1;
      klon.querySelector("p").textContent =
        item.pris1 + "kr. " + item.pris2 + "kr.";
      // pager ID'et af produktet over på en ny siden (singleView), hvor vi henter alle infomationerne igen.
      klon.querySelector("img").addEventListener("click", () => {
        location.href = `singleview.html?id=${item._id}`;
      });
      //når spanden klikkes, start annonym(arrow funktion) funktion
      klon.querySelector(".spand").addEventListener("click", () => {
        // finder id'et af den valgte spand
        let id = favoritter.indexOf(item);
        console.log(id);
        //fjerner alt imellem vores valgt id os så en index frem. Altså kun den valgte spand fjernes fra listen.
        favoritter.splice(id, 1);
        hjertID.splice(id, 1);
        console.log(favoritter);
        //Tilføjer vores arrays til localStorage
        localStorage.setItem("favoritter", JSON.stringify(favoritter));
        localStorage.setItem("hjertID", JSON.stringify(hjertID));
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

// if/else statement til at vide om der er tilføjet varer til favoritter. Hvis den er tom, kommer der en besked frem.
function hearts() {
  //henter vores Array fra LocalStorage og sætter den i en variable
  let checkFav = localStorage.getItem("favoritter", JSON.stringify(favoritter));
  // check at vi har hentet vores liste
  console.log(checkFav + " Lister med checkFAv");
  //Tjekker om Listen ikke ligger i LocalStorage 
  if (checkFav === null) {
    console.log("there is nothing in here");
    console.log(checkFav);
  } // Tjekker om Listen er Lige med 0. Altså listen i localstorage findes men er tom.
  else if (favoritter.length === 0) {
    console.log("Stuff has been picked");
  } // hvis listen ikke er tom, Tilføjes en "display: none" til den tekst som står på siden når favoritter er tom. 
  else {
    console.log("intet virker");
    document.querySelector(".tomListe").classList.add("displayNone");
  }
}

// start de 2 funktioner
hearts();
printud(favoritter);
