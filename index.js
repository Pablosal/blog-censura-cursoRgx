const blogTitles = [...document.querySelectorAll(".blogpost_title")];
const goToPage = (data_link) =>  (window.location.href = data_link.attributes.data_url.nodeValue)
const callModal = (title) =>
  Swal.fire({
    title: "Seguro que deseas seguir a esta pagina?",
    text: "Esta pagina contiene palabras que puede que no sean de tu agrado",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Lo Vere Bajo Mi Responsabilidad",
    cancelButtonText: "No deseo ver esto",
  }).then((result) => {
    if (result.isConfirmed) {
      goToPage(title);
      
    } else {
      return false;
    }
  });
const calamities = ["cientifico", "COVID", "dias"];
const getCalamitiesRegex = (array) => {
  const calamitiesList = array.reduce((calamity, acc) => `${calamity}|${acc}`);
  const calamitiesListRgx = new RegExp(`(${calamitiesList})`, "gi");
  return calamitiesListRgx;
};
const checkForCalamities = (fn) => (rgx) => (title) => {
    console.log(rgx.test(title.firstElementChild.textContent) ||
    rgx.test(title.nextElementSibling.textContent));
  if (
    rgx.test(title.firstElementChild.textContent) ||
    rgx.test(title.nextElementSibling.textContent)
  ) {
    fn
  } else {
    goToPage(title);
  }
};

const blurText = (HTMLElement, checkWordsRgx) => {
  const matches = HTMLElement.match(checkWordsRgx);
  let newString = HTMLElement.replace(
    checkWordsRgx,
    `<span class="blur">${matches}</span>  `
  );
  return newString;
};
blogTitles.forEach(title=>{title.onclick=()=>{
    checkForCalamities(callModal(title))(getCalamitiesRegex(calamities))(title)}
})
window.onload = () => {
  blogTitles.forEach((title) => {
    title.firstElementChild.innerHTML = blurText(
      title.firstElementChild.textContent,
      getCalamitiesRegex(calamities)
    );
  });
};

