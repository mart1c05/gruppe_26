const header = document.querySelector("header h2");
      const url = "https://bomuldsboern-26e2.restdb.io/rest/produkter";
      const options = {
        headers: { "x-apikey": "620f5c4634fd62156585879d" },
      };
      document.addEventListener("DOMContentLoaded", start);
      let retter;
      let filter = "alle";
      function start() {
        const filterKnapper = document.querySelectorAll("nav button");
        filterKnapper.forEach((knap) =>
          knap.addEventListener("click", filtrerRetter)
        );
        //loadJSON();
      }
      function filtrerRetter() {
        console.log("knap");
        filter = this.dataset.kategori;
        document.querySelector(".valgt").classList.remove("valgt");
        this.classList.add("valgt");
        vis(retter);
        header.textContent = this.textContent;
      }

      async function hentData() {
        console.log("hentdata");
        const resultat = await fetch(url, options);

        retter = await resultat.json();
        console.log("Retter", retter);
        vis(retter);
      }
      hentData();

      function vis(json) {
        console.log(json);
      }

      function vis(retter) {
        const data = document.querySelector(".data_menu");
        const menuTemplate = document.querySelector("template");
        data.textContent = "";
        retter.forEach((ret) => {
          console.log("Kategori", ret.kategori);
          if (filter == ret.kategori || filter == "alle") {
            const klon = menuTemplate.cloneNode(true).content;
            klon.querySelector("h3").textContent = ret.navn;
            klon.querySelector("img").src =
              "medium/" + ret.billednavn + "-md.jpg";
            klon.querySelector(".beskrivelse").textContent =
              ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent =
              "Pris: " + ret.pris + ",-";
            klon
              .querySelector("article")
              .addEventListener("click", () => visDetaljer(ret));
            data.appendChild(klon);
          }
        });

        function visDetaljer(ret) {
          console.log(ret);
          popup.style.display = "block";
          popup.querySelector("h2").textContent = ret.navn;
          popup.querySelector("img").src =
            "medium/" + ret.billednavn + "-md.jpg";
          popup.querySelector(".popup_beskrivelse").textContent =
            ret.langbeskrivelse;
          popup.querySelector(".popup_pris").textContent =
            "Pris: " + ret.pris + ",-";
          popup.querySelector(".popup_region").textContent =
            ret.oprindelsesregion;
        }
        document
          .querySelector("#luk")
          .addEventListener("click", () => (popup.style.display = "none"));
      }