// hämtar element
const tsInput = document.querySelector("[data-fn-ts-input]");
const commentsListLvl1 = document.querySelector("[data-comments-list-lvl1]");
const commentLvl1Template = document.querySelector(
  "[data-comment-lvl1-template]"
);
const commentsCount = document.querySelector("[data-comments]");

// pga localstrage så sparar jag alla de hårdkodade kommentarerna i en array
const hardcodedComments = [
  "comment1",
  "comment2",
  "comment3",
  "comment4",
  "comment5",
  "comment6",
  "comment7",
  "comment8",
  "comment9",
  "comment10",
  "comment11",
];

// hämtar nuvarande siffervärde på ts comment count
let count = parseInt(commentsCount.dataset.comments);

// kallar få funktionen för att ladda alla sparade kommentarer
loadComments();

// lyssnar efter ett keypress på tsInput
tsInput.addEventListener("keypress", function (event) {
  // om enter klickas på
  if (event.key === "Enter") {
    // för säkerhetsskull så stoppar vi default action
    event.preventDefault();

    // hämtar värdet i input
    const tsInputValue = tsInput.value;
    // rensar input
    tsInput.value = "";

    // skapar en klon av comment template
    const comment = commentLvl1Template.content.cloneNode(true).children[0];

    // hämtar textcontent arean
    const commentTextContent = comment.querySelector(
      "[data-replace-text-content]"
    );
    // skriver ut tsInputValue i commentTextContent
    commentTextContent.textContent = tsInputValue;

    //sSpottar ut kommentaren längst ner i listan
    commentsListLvl1.append(comment);

    // kommentarssiffran ska öka med ett
    count++;
    // uppdaterar siffran i DOM och dataset
    commentsCount.textContent = count;
    commentsCount.dataset.comments = count;

    // lägger till kommenataren i localStorage
    addComment(tsInputValue);

    // kallar på lastchild funktionen
    lastChildOfListLvl1();

    comment.scrollIntoView({ behavior: "smooth", block: "end" });

    // om man vill ta bort kommentar
    const deleteBtn = comment.querySelector("[data-fn-delete-comment]");
    deleteBtn.addEventListener("click", () =>
      removeComment(commentText, comment)
    );
  }
});

// funktion för att lägga till kommentar i localstorage
function addComment(comment) {
  // hämta nuvarande kommentarer från localStorage
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  // och lägger till ny kommentar
  comments.push(comment);
  // spara uppdaterade kommentarer i localStorage
  localStorage.setItem("comments", JSON.stringify(comments));
  // och renderar alla sparade kommentarer igen
  // renderComments(comments);
}

// funktion för att ladda kommentarer
function loadComments() {
  // hämtar kommentarer från localStorage
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  // uppdaterar kommentarsräknaren
  count = comments.length + hardcodedComments.length;
  commentsCount.textContent = count;
  commentsCount.dataset.comments = count;

  // rendera både hårdkodade och sparade kommentarer
  renderComments(comments);
}

// funktion för att rendera kommentarerna
function renderComments(comments) {
  // tömmer den nuvarande listan men lämnar de hårdkodade kommentarerna
  while (commentsListLvl1.children.length > hardcodedComments.length) {
    commentsListLvl1.removeChild(commentsListLvl1.lastChild);
  }
  // Lägg till varje sparad kommentar i listan
  comments.forEach((commentText) => {
    const comment = commentLvl1Template.content.cloneNode(true).children[0];
    const commentTextContent = comment.querySelector(
      "[data-replace-text-content]"
    );
    commentTextContent.textContent = commentText;
    commentsListLvl1.append(comment);

    // om man vill ta bort kommentar
    const deleteBtn = comment.querySelector("[data-fn-delete-comment]");
    deleteBtn.addEventListener("click", () =>
      removeComment(commentText, comment)
    );
  });
}

// funktion för att ta bort kommentar
function removeComment(commentText, commentElement) {
  // Bekräfta borttagning
  if (confirm("Vill du verkligen ta bort denna kommentar?")) {
    // Ta bort visuellt
    commentElement.remove();

    // Ta bort från localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter((comment) => comment !== commentText);
    localStorage.setItem("comments", JSON.stringify(comments));

    // Uppdatera räknaren
    count--;
    commentsCount.textContent = count;
    commentsCount.dataset.comments = count;

    lastChildOfListLvl1();
  }
}

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
