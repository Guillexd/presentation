AOS.init({
  duration: 1500,
  once: true,
});

const d = document;
const btnFullScreen = d.querySelector("#fullScreenbtn");
const body = d.documentElement;
const projectsContainer = d.querySelector("#examples__container");
const $fragment = d.createDocumentFragment();

btnFullScreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Si el documento está en pantalla completa, salir de ella
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari y Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* Internet Explorer y Edge */
      document.msExitFullscreen();
    }
  } else {
    // Si el documento no está en pantalla completa, poner el elemento en pantalla completa
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.mozRequestFullScreen) {
      /* Firefox */
      body.mozRequestFullScreen();
    } else if (body.webkitRequestFullscreen) {
      /* Chrome, Safari y Opera */
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) {
      /* Internet Explorer y Edge */
      body.msRequestFullscreen();
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".examples figure img") && window.innerWidth < 1024) {
    const Redirection =
      e.target.closest("figure").lastElementChild.lastElementChild
        .lastElementChild;
    Redirection.click();
    // e.target.closest('section').innerHTML+=`<meta http-equiv="refresh" content="0; url=${Redirection}">`;
  }

  if (e.target.matches("#menu *") && window.innerWidth < 1000) {
    e.target.closest("div").classList.remove("show");
  }
});

const titles = d.querySelectorAll("h2");
const titles__navbar = d.querySelectorAll("#menu li a");

const watchTitles = (entries, observer) => {
  entries.forEach((element) => {
    if (element.isIntersecting) {
      titles__navbar.forEach((el) => {
        if (el.textContent == element.target.textContent) {
          el.classList.add("style_menu__list");
        } else {
          el.classList.remove("style_menu__list");
        }
      });
    }
  });
};
const observator = new IntersectionObserver(watchTitles, {
  root: null, //vista de pantalla
  rootMargin: "0px 0px 0px 0px", // margen del root(vista de pantalla)
  threshold: 1, //profundidad de entrada del objeto (por defecto: 0)
});
titles.forEach((el) => observator.observe(el));

fetch("./js/project.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((el) => {
      const $section = d.createElement("section");
      $section.classList.add("examples");
      $section.innerHTML = `
        <figure>
          <img src="./assets/img/${el.image}.png" alt="${el.alt}">
          <div class="information__shadow d-flex flex-column justify-content-center align-items-center">
            <h3 class="mt-4">${el.title}</h3>
            <span>${el.description}</span>
            <br class="d-none d-md-block">
            <div class="d-flex justify-content-around w-100">
              ${
                el.firstbtnLink
                  ? `<a
                    class="btn btn-primary link__query"
                    href="${el.firstbtnLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${el.firstbtnName}
                  </a>`
                  : `<a
                    class="btn btn-primary disabled"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${el.firstbtnName}
                  </a>`
              }
              ${
                el.secondbtnLink
                  ? `<a class="btn btn-secondary" href="${el.secondbtnLink}" target="_blank" rel="noopener noreferrer">${el.secondbtnName}</a>`
                  : `<a class="btn btn-secondary disabled" href="#" target="_blank" rel="noopener noreferrer">${el.secondbtnName}</a>`
              }
            </div>
          </div>
        </figure>
      `;
      $fragment.appendChild($section);
    });
    projectsContainer.appendChild($fragment);
  })
  .catch((err) => console.log(err));
