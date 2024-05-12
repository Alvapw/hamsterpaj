// MENU
const menuIcon = document.querySelector("[data-fn-toggle-menu]");
const headerSearch = document.querySelector("[data-header-search]");
const mainMenuList = document.querySelector("[data-main-menu]");
const headerBtn = document.querySelector("[data-header-btn]");

// TO-DO: lägg till fler klasser i header
menuIcon.addEventListener("click", function () {
  headerSearch.classList.toggle("active");
  mainMenuList.classList.toggle("active");
  headerBtn.classList.toggle("active");
  menuIcon.classList.toggle("exit");
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
  const optionIcons = dropdown.querySelectorAll("[data-dropdown-option-icon]");

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
      // console.log("click");
      // när ett option klickas på så ska selected innerText ändras till det klickade optionets innerText
      selected.innerText = option.innerText;
      // om det finns en icon ska selectedIcon bytas ut till optionIcon
      // TO-DO: byta ut ikon
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
