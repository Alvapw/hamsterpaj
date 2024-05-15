// MENU
const menuIcon = document.querySelector("[data-fn-toggle-menu]");
const headerDropdown = document.querySelector("[data-fn-header-dropdown]");
const iconNav = document.querySelector("[data-fn-icon-nav]");

// tooglar klasser när man klickar fram menu
menuIcon.addEventListener("click", function () {
  menuIcon.classList.toggle("exit");
  headerDropdown.classList.toggle("open");
});

// DROPDOWNS
// hämtar alla dropdowns
const dropdowns = document.querySelectorAll("[data-fn-dropdown]");

// loopar igenom alla dropdowns
dropdowns.forEach((dropdown) => {
  // hämtar alla inre element i dropdowns
  const select = dropdown.querySelector("[data-dropdown-select]");
  const selected = dropdown.querySelector("[data-dropdown-selected]");
  const selectedIcon = dropdown.querySelector("[data-dropdown-selected-icon]");
  const caret = dropdown.querySelector("[data-dropdown-caret]");
  const list = dropdown.querySelector("[data-dropdown-list]");
  const options = dropdown.querySelectorAll("[data-dropdown-option]");
  // const optionIcons = dropdown.querySelectorAll("[data-dropdown-option-icon]");

  // lägger till en lyssnare på select
  select.addEventListener("click", () => {
    // togglar active class på select
    select.classList.toggle("open");
    // togglar rotate class på caret
    caret.classList.toggle("rotate");
    // togglar open class på list
    list.classList.toggle("open");
  });

  // loopar igenom alla options
  options.forEach((option) => {
    // lägger till lyssnare på option
    option.addEventListener("click", () => {
      // när ett option klickas på så ska selected innerText ändras till det klickade optionets innerText
      selected.innerText = option.innerText;

      // skapar variabel för att kolla om elementet har en icon
      const hasIcon =
        option.querySelector("[data-dropdown-option-icon]") != null;
      // om den har en icon så ska vi ta bort och applicera classerna
      if (hasIcon) {
        // hämtar det klickade optionets ikon
        const optionIcon = option.querySelector("[data-dropdown-option-icon]");
        // hämtar ikones classer
        const iconClasses = optionIcon.classList;
        // tar bort tidigare classer från selectedIcon
        selectedIcon.className = "";
        // loopar igenom alla classer och applicerar på selectedIcon
        iconClasses.forEach(function (klass) {
          selectedIcon.classList.add(klass);
        });
      }

      // tar bort classer som förut lades till
      select.classList.remove("open");
      caret.classList.remove("rotate");
      list.classList.remove("open");

      // loopar igenom alla options för att se om något option redan har classen active
      options.forEach((option) => {
        if (option.classList.contains("active")) {
          option.classList.remove("active");
        }
      });
      // sen kan vi lägga till active class på det klickade optionet
      option.classList.toggle("active");
    });
  });
});

// hämtar alla like-interactions
const likeContainer = document.querySelectorAll("[data-fn-like-post]");

// loopar igenom varje likeInteraction
likeContainer.forEach((likeInteraction) => {
  // sätter lyssnare på klick
  likeInteraction.addEventListener("click", (e) => {
    // hämtar icon
    const icon = likeInteraction.querySelector("[data-icon]");
    // hämtar text
    const countNr = likeInteraction.querySelector("[data-count]");

    // när man klickar ska också countvärdet gå upp med ett
    // så vi hämtar nuvarande siffervärde
    let count = parseInt(countNr.dataset.count);

    // först kollar vi om den redan är gillad
    if (likeInteraction.classList.contains("pressed")) {
      // om containern redan har klassen 'pressed', ta bort alla tillagda klasser
      likeInteraction.classList.remove("pressed");
      icon.classList.remove("ph-fill", "pressed-color", "animation-color");
      countNr.classList.remove("pressed-color", "animation-opacity");

      // siffran ska minska med ett
      count--;
    } else {
      // det första som händer är att texten får opacity 0, så vi lägger då på den classen
      countNr.classList.add("animation-opacity");

      // sen ska iconen på en rosa border samtidigt som den växer
      // lägger till classen för color
      icon.classList.add("animation-color");
      // i js får vi iconen att förstoras
      setTimeout(() => {
        icon.style.transform = "scale(2.5)";
      }, 100); // .1s efter man klickat
      // sen ska iconen återgå till normal storlek
      setTimeout(() => {
        icon.style.transform = "scale(1)";
        // när iconen är tillbaks till ursprungsstorlek så star vi bort opacity-animation från text, med hjälp av timer
        countNr.classList.remove("animation-opacity");
      }, 500); // .5s efter klick är den tillbaks till normal storlek

      // då ska också pressed state läggas till på hela containern
      setTimeout(() => {
        likeInteraction.classList.add("pressed");
        // samtidigt lägger vi till fill class på icon
        icon.classList.add("ph-fill");
        // och tar bort icon pink color
        icon.classList.remove("animation-color");
        // och lägger till vit färg på icon
        icon.classList.add("pressed-color");
        // och på text
        countNr.classList.add("pressed-color");
      }, 700);

      // siffran ska öka med ett
      count++;
    }
    // uppdaterar siffran i DOM och dataset
    countNr.textContent = count;
    countNr.dataset.count = count;
  });
});
