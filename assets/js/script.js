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
const like = document.querySelectorAll("[data-fn-like-post]");

// lyssnare på vardera like
like.forEach((likeInteraction) => {
  likeInteraction.addEventListener("click", (e) => {
    // lägger till class
    likeInteraction.classList.toggle("pressed");

    // hämtar icon och togglar fill
    const icon = likeInteraction.querySelector("[data-icon]");
    icon.classList.toggle("ph-fill");

    // hämtar referens till nrtexten
    const countNr = likeInteraction.querySelector("[data-count]");

    // hämta nuvarande siffervärde
    let count = parseInt(countNr.dataset.count);

    if (likeInteraction.classList.contains("pressed")) {
      // om elementet innehåller klassen pressed så ökar vi siffran med ett
      count++;
    } else {
      // om inte så minskar vi siffran med ett
      count--;
    }

    // uppdatera siffran i DOM och dataset
    countNr.textContent = count;
    countNr.dataset.count = count;
  });
});
