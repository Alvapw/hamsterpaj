// Hämtar element
const tsInput = document.querySelector("[data-fn-ts-input]");
const commentsListLvl1 = document.querySelector("[data-comments-list-lvl1]");
const commentLvl1Template = document.querySelector(
  "[data-comment-lvl1-template]"
);
const commentLvl2Template = document.querySelector(
  "[data-comment-lvl2-template]"
);

// Lyssnar efter ett keypress på tsInput
tsInput.addEventListener("keypress", function (event) {
  // Om enter klickas på
  if (event.key === "Enter") {
    // För säkerhetsskull så stoppar vi default action
    event.preventDefault();

    // Hämtar värdet i input
    const tsInputValue = tsInput.value;
    // Rensar input
    tsInput.value = "";

    // Skapar en klon av comment template
    const comment = commentLvl1Template.content.cloneNode(true).children[0];

    // Hämtar textcontent arean
    const commentTextContent = comment.querySelector(
      "[data-replace-text-content]"
    );
    // Skriver ut tsInputValue i commentTextContent
    commentTextContent.textContent = tsInputValue;

    // Spottar ut kommentaren i listan
    commentsListLvl1.append(comment);

    lastChildOfListLvl1();
  }
});

// skapar funktion för att hitta last child och applicera class
function lastChildOfListLvl1() {
  // hämtar alla kommentarer i list lvl1
  const allListItems = commentsListLvl1.querySelectorAll("[data-comment-lvl1]");

  const secondLastListItem = allListItems[allListItems.length - 2];
  secondLastListItem.classList.remove("last-child");

  // hämtar den sista kommentaren
  const lastListItem = allListItems[allListItems.length - 1];
  lastListItem.classList.add("last-child");
}

lastChildOfListLvl1();

// GO BACK
// klickhändelse för gå tillbaka knapp
const goBackBtn = document.querySelector("[data-fn-go-back]");

goBackBtn.addEventListener("click", () => {
  // gå tillbaka till föregående sida i historiken
  window.history.back();
});

// SAVE POST
const saveBtn = document.querySelector("[data-fn-save-post]");
const saveIcon = document.querySelector("[data-save-icon]");

saveBtn.addEventListener("click", () => {
  // när man klickar på hjärtat så ska det växa sen gå tillbaks till ursprunglig storlek samt bli filled
  // kollar om post redan är sparad
  if (saveBtn.classList.contains("pressed")) {
    saveBtn.classList.remove("pressed");
    saveIcon.classList.remove("ph-fill");
  } else {
    saveBtn.classList.add("pressed");
    setTimeout(() => {
      saveIcon.style.transform = "scale(2)";
      saveIcon.classList.add("ph-fill");
    }, 100); // .1s efter man klickat
    // sen ska iconen återgå till normal storlek
    setTimeout(() => {
      saveIcon.style.transform = "scale(1)";
    }, 500); // .5s efter klick är den tillbaks till normal storlek
  }
});
