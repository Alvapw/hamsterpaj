// hämtar element
const tsInput = document.querySelector("[data-fn-ts-input]");
const commentsListLvl1 = document.querySelector("[data-comments-list-lvl1]");
const commentLvl1Template = document.querySelector(
  "[data-comment-lvl1-template]"
);
const commentLvl2Template = document.querySelector(
  "[data-comment-lvl2-template]"
);
// const commentInput = document.querySelectorAll
// const lvl1Comments = document.querySelectorAll('[data-]')
// lvl1Comments
// // Lyssnar efter ett keypress på tsInput
// tsInput.addEventListener("keypress", function (event) {
//   // Om Enter klickas på
//   if (event.key === "Enter") {
//     // För säkerhetsskull så stoppar vi default action
//     event.preventDefault();

//     // Hämtar värdet i input
//     const tsInputValue = tsInput.value;
//     // Rensar input
//     tsInput.value = "";

//     // Skapar en klon av comment template
//     const comment = commentLvl1Template.content.cloneNode(true).children[0];

//     // Hämtar textcontent area
//     const commentTextContent = comment.querySelector(
//       "[data-replace-text-content]"
//     );
//     // Skriver ut tsInputValue i commentTextContent
//     commentTextContent.textContent = tsInputValue;

//     // // Skapar svarsknappen
//     // const replyButton = document.createElement("button");
//     // replyButton.textContent = "Svara";
//     // replyButton.classList.add("reply-button");
//     // // Lägger till svarsknappen i kommentaren
//     // comment.appendChild(replyButton);

//     // Skapar lvl2-lista för svar
//     const commentsListLvl2 = document.createElement("ul");
//     commentsListLvl2.classList.add("comments-list-lvl2");

//     // Lägger till lvl2-listan i kommentaren
//     comment.appendChild(commentsListLvl2);

//     // Lyssnar efter klick på svarsknappen
//     replyButton.addEventListener("click", function () {
//       // Skapa formulär för att svara på lvl2-kommentaren
//       const form = createCommentForm();
//       // Lägg till formuläret i lvl2-listan
//       commentsListLvl2.appendChild(form);
//     });

//     // Spottar ut kommentaren i lvl1-listan
//     commentsListLvl1.appendChild(comment);
//   }
// });

// // Funktion för att skapa ett formulär för att lägga till en lvl2-kommentar
// function createCommentForm() {
//   const form = document.createElement("form");
//   form.classList.add("comment-form");
//   form.innerHTML = `
//     <textarea class="comment-textarea" placeholder="Skriv din kommentar här"></textarea>
//     <button type="submit" class="comment-submit">Skicka</button>
//   `;
//   // Lyssna efter formulärets inskickning
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Hämta kommentarstexten
//     const textarea = form.querySelector(".comment-textarea");
//     const commentText = textarea.value;
//     // Skapa en ny lvl2-kommentar med den angivna texten
//     const newComment = createComment(commentText);
//     // Lägg till den nya kommentaren i lvl2-listan
//     form.parentNode.appendChild(newComment);
//     // Ta bort formuläret
//     form.remove();
//   });
//   return form;
// }

// // Funktion för att skapa en ny lvl2-kommentar
// function createComment(text) {
//   const comment = document.createElement("li");
//   comment.classList.add("c-thread__comment", "c-thread__comment--lvl2");
//   comment.textContent = text;
//   return comment;
// }

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
  }
});

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
