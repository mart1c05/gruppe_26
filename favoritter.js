/* let produkt = sessionStorage.getItem("favorit"); */

let produkter = JSON.parse(sessionStorage.getItem("favoritter"));

console.log(produkter);

function printud(produkter) {
  const data = document.querySelector(".data_products");
  const tøjTemplate = document.querySelector("template");
  data.textContent = "";

  produkter.forEach((item) => {
    console.log(item);
    const klon = tøjTemplate.cloneNode(true).content;
    klon.querySelector("h3").textContent = item.navn;
    klon.querySelector("img").src = item.billede1;

    klon.querySelector("p").textContent =
      item.pris1 + "kr. " + item.pris2 + "kr.";
    data.appendChild(klon);
  });
}

printud(produkter);
