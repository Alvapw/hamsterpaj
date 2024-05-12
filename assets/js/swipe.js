"use strict";

// hämtar containern
var swiperContainer = document.querySelector("[data-fn-swiper-container]");
// hämtar alla cards
var allCards = document.querySelectorAll("[data-swiper-item]");
// hämtar swipe-vänster knapp
var nope = document.getElementById("nope");
// hämtar swipe-höger knapp
var love = document.getElementById("love");

// skapar funktion
function initCards(card, index) {
  // sparar ner alla kort som inte har swipeats bort
  var newCards = document.querySelectorAll(".c-swiper__item:not(.removed)");

  // loopar igenom alla kort i arrayen newCards
  // parameter som representerar det självaste kortet + parameter som representerar kortets plats i arrayen
  newCards.forEach(function (card, index) {
    // ändrar det aktuella kortets z-index för att kunna stapla korten, det första kortet får z-index 0 och hamnar därför längst bak
    card.style.zIndex = allCards.length - index;
    // transformation för korten beroende på dess plats
    //  scale ändrar storlek så att det översta kortet blir störst
    // translateX flyttar varje kort en bit till vänster
    card.style.transform =
      "scale(" + (20 - index) / 20 + ") translateX(-" + 50 * index + "px)";
    // ändrar blur på varje kort
    card.style.filter = "blur(" + index + "px)";
  });

  // lägger till class loaded på container så att innehållet fadeas in
  swiperContainer.classList.add("loaded");
}

// kallar på funktionen som vi precis har skapat
initCards();

// loopar igenom alla korten och kör en inre funktion
allCards.forEach(function (el) {
  // skapar en instans av js-biblioteket hammer som erbjuder stöd för pekgester på webbsidor
  var hammertime = new Hammer(el);

  // lägger lyssnare på när användaren drar över kortet med 'fingret', när det händer läggs klassen moving på på kortet
  hammertime.on("pan", function (event) {
    el.classList.add("moving");
  });

  // vi lägger till ännu en lyssnare på 'pan'
  hammertime.on("pan", function (event) {
    // vi gör några kontroller, om någon av dessa uppfylls så avbryts funktionen
    // vi kollar om den horisontella förändringen är 0
    if (event.deltaX === 0) return;
    // vi kollar om pekarens centerposition är 0,0
    if (event.center.x === 0 && event.center.y === 0) return;

    // om kraven uppfylls så förändrar vi transform på kortet så att det swipeas rakt ur åt sidan
    event.target.style.transform = "translateX(" + event.deltaX + "px)";
  });

  // nu lyssnar vi efter om användaren slutar att panorera
  hammertime.on("panend", function (event) {
    // classen moving tas bort från det aktuella kortet (classen används för att indikera att kortet rör sig när det används)
    el.classList.remove("moving");

    // här beräknar vi bredden på skärmen för att sedan bestämma gur långt kortet ska röra sig åt sidan när det dras bort
    var moveOutWidth = document.body.clientWidth;
    // här bestämmer vi om korten ska dras ut från sidan eller stanna kvar, om det har dragits mindre än 80px i sidled eller i kortare än .5s så stannar det kvar
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    // beroende på värdet på keep kommer classen remove på kortet att togglas eller inte
    event.target.classList.toggle("removed", !keep);

    if (keep) {
      // om keep är sant så ska kortet behållas och dess position återtar ursprungspositionen
      event.target.style.transform = "";
    } else {
      // om keep är falskt ska kortet dras ut från skärmen i en viss hastighet och rörelse beroende på användarens drag
      var endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      );
      // deltaX används för att bestämma hur långt kortet ska dras åt sidan
      var toX = event.deltaX > 0 ? endX : -endX;

      // translateX uppdaterar kortet horizontella position
      event.target.style.transform = "translateX(" + toX + "px)";

      // kallar på funktionen
      initCards();
    }
  });
});

// TO-DO: fixa btns
// function createButtonListener(love) {
//   return function (event) {
//     var cards = document.querySelectorAll(".tinder--card:not(.removed)");
//     var moveOutWidth = document.body.clientWidth * 1.5;

//     if (!cards.length) return false;

//     var card = cards[0];

//     card.classList.add("removed");

//     if (love) {
//       card.style.transform =
//         "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
//     } else {
//       card.style.transform =
//         "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
//     }

//     initCards();

//     event.preventDefault();
//   };
// }

// var nopeListener = createButtonListener(false);
// var loveListener = createButtonListener(true);

// nope.addEventListener("click", nopeListener);
// love.addEventListener("click", loveListener);
