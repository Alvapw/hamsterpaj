// hämtar element
const tsInput = document.querySelector("[data-fn-ts-input]");
const commentsListLvl1 = document.querySelector("[data-comments-list-lvl1]");
const commentLvl1Template = document.querySelector(
  "[data-comment-lvl1-template]"
);

// lyssnar efter ett keypress på tsInput
tsInput.addEventListener("keypress", function (event) {
  // om enter klickas på
  if (event.key === "Enter") {
    // för säkerhetsskull så stoppar vi default action
    event.preventDefault();

    // hämtar värdet i input
    tsInputValue = tsInput.value;
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

    // spottar ut kommentaren i listan
    commentsListLvl1.append(comment);

    // använd funktionen för att lägga till klassen för nivå 1-kommentarer
    addLastChildClass("[data-comment-lvl1]");
  }
});

function addLastChildClass(commentSelector) {
  const comments = document.querySelectorAll(commentSelector);
  // tar bort .last-child från alla element om något har den aktiverad redan
  comments.forEach((element) => {
    element.classList.remove("last-child");
  });

  // lägg till classen på enbart den sista kommentaren
  const lastComment = comments[comments.length - 1];
  if (lastComment) {
    lastComment.classList.add("last-child");
  }
}

// använd funktionen för att lägga till klassen för nivå 1-kommentarer
addLastChildClass("[data-comment-lvl1]");

// använd funktionen för att lägga till klassen för nivå 2-kommentarer
addLastChildClass("[data-comment-lvl2]");
