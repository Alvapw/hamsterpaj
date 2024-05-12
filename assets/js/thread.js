// hämtar element
const tsInput = document.querySelector("[data-fn-ts-input]");
const commentsListLvl1 = document.querySelector("[data-comments-list-lvl1]");
const commentTemplate = document.querySelector("[data-comment-template]");

// TO-DO: kanske ne knapp istället...
// lyssnar efter ett keypress på tsInput
tsInput.addEventListener("keypress", function (event) {
  // om enter klickas på
  if (event.key === "Enter") {
    // för säkerhetsskull så stoppar vi default action
    event.preventDefault();

    // hämtar värdet i input
    console.log(tsInput.value);
    tsInputValue = tsInput.value;
    // rensar input
    tsInput.value = "";

    // skapar en klon av comment template
    const comment = commentTemplate.content.cloneNode(true).children[0];

    // hämtar textcontent arean
    const commentTextContent = comment.querySelector(
      "[data-replace-text-content]"
    );
    // skriver ut tsInputValue i commentTextContent
    commentTextContent.textContent = tsInputValue;

    // spottar ut kommentaren i listan
    commentsListLvl1.append(comment);

    // hämtar alla kommentarer i listan
    const comments = document.querySelectorAll("[data-comment-lvl1]");
    // tar bort .last-child från alla element om något har den aktiverad redan
    comments.forEach((element) => {
      element.classList.remove("last-child");
    });

    // lägg till classen på enbart den sista kommentaren
    const lastComment = comments[comments.length - 1];
    lastComment.classList.add("last-child");
  }
});
