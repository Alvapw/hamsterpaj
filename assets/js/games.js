let games = [];
const filters = {
  tags: [],
  category: [],
  search: "",
};
const gameTeaserTemplate = document.querySelector(
  "[data-game-teaser-template]"
);
const gameFeed = document.querySelector("[data-game-feed]");
const searchInput = document.querySelector("[data-search]");
const tags = document.querySelectorAll("[data-tag]");
const catys = document.querySelectorAll("[data-caty]");
const sorting = document.querySelectorAll("[data-sort]");
let saveCategory;
let saveFilter = [];

// lyssnar efter input i sökfältet och hämtar värdet
searchInput.addEventListener("input", (e) => {
  const valueInput = e.target.value.toLowerCase();
  filters.search = valueInput;
  render();
});

// hämtar json data och pushar in det i arrayen games
fetch("assets/json/gamesData.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((game) => {
      games.push(game);
    });
    render();
  })
  .catch((error) => console.log(error));

// funktion för att skapa korten
function createGameTeaser(game) {
  // klonar template
  const gameTeaser = gameTeaserTemplate.content.cloneNode(true).children[0];

  // byter ut datan i kortet
  const coverImgMobile = gameTeaser.querySelector(
    "[data-replace-mobile-cover-img]"
  );
  coverImgMobile.setAttribute("srcset", game.coverImgMobile);

  const coverImgDesktop = gameTeaser.querySelector(
    "[data-replace-desktop-cover-img]"
  );
  coverImgDesktop.setAttribute("srcset", game.coverImgDesktop);

  const title = gameTeaser.querySelector("[data-replace-title]");
  title.textContent = game.title;

  // filtrerar ut vilka screens som skaskrivas ut i kortet
  const screensContainer = gameTeaser.querySelector("[data-replace-screens]");

  // om mobile är true så skapar vi element med rätt icon
  if (game.mobile === true) {
    const mobileScreen = document.createElement("i");
    mobileScreen.classList.add(
      "ph",
      "ph-device-mobile",
      "c-icon",
      "c-icon--xs"
    );
    screensContainer.append(mobileScreen);
  }

  // om desktop är true så skapr vi ett element med rätt icon
  if (game.desktop === true) {
    const desktopScreen = document.createElement("i");
    desktopScreen.classList.add("ph", "ph-desktop", "c-icon", "c-icon--xs");
    screensContainer.append(desktopScreen);
  }

  const text = gameTeaser.querySelector("[data-replace-text]");
  text.textContent = game.text;

  // filtrerar ut hur många och vilka tags som ska skrivas ut i kortet och skapar elementet med rätt class
  const tagsContainer = gameTeaser.querySelector("[data-replace-tags]");
  game.tags.forEach((tag) => {
    // console.log(tag);
    const spanTag = document.createElement("span");
    spanTag.classList.add("c-tag");
    spanTag.textContent = tag;
    tagsContainer.append(spanTag);
  });

  // filtrerar ut hur många fyllda stjärnor som ska skrivas ut i kortet och skapar elmenten
  const starsContainer = gameTeaser.querySelector("[data-replace-stars]");

  const stars = game.stars;
  var starHTML = "";
  for (var i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.classList.add("c-icon", "c-icon--sm", "ph", "ph-star");

    if (i <= stars) {
      star.classList.add("ph-fill");
    }

    starHTML += star.outerHTML;
  }

  starsContainer.innerHTML = starHTML;

  if (game.trending === true) {
    gameTeaser.querySelector("[data-game]").classList.add("trending");
  }

  // spottar ut kortet i rätt container
  gameFeed.append(gameTeaser);
}

let ok;

function toggleItemArray(item, array) {
  //Om det finns i arrray ta bort
  //om det inte finns lägg till
  array.includes(item);
  if (array.includes(item)) {
    const index = array.indexOf(item);
    array.splice(index, 1);
  } else {
    array.push(item);
  }
}

let currentCategory = null;
let currentTag = null;
let currentSort = null;

tags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    currentTag = e.target.dataset.tag;
    render();
  });
});

catys.forEach((caty) => {
  caty.addEventListener("click", (e) => {
    currentCategory = e.target.dataset.caty;
    render();
  });
});

sorting.forEach((sort) => {
  sort.addEventListener("click", (e) => {
    currentSort = e.target.dataset.sort;
    sortGames(currentSort);
    render();
    // ändrar heading innehåll beroende på vilken sortering som är aktuell
    const feedHeading = document.querySelector("[data-replace-feed-heading]");
    if (currentSort === "stars") {
      feedHeading.textContent = "Betyg, från högst till lägst";
    }
    if (currentSort === "recommend") {
      feedHeading.textContent = "Rekommenderade spel för dig";
    }
  });
});

function render() {
  let filteredGames = [...games];

  // Filtrera efter sökning
  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(search)
    );
  }

  // Filtrera efter vald kategori
  if (currentCategory) {
    filteredGames = filteredGames.filter((game) =>
      game.category.includes(currentCategory)
    );
  }

  // Filtrera efter vald tagg
  if (currentTag) {
    filteredGames = filteredGames.filter((game) =>
      game.tags.includes(currentTag)
    );
  }

  // Sortera
  if (currentSort) {
    sortGames(currentSort);
  }

  gameFeed.innerHTML = "";
  filteredGames.forEach((game) => createGameTeaser(game));
}

function sortGames(criteria) {
  switch (criteria) {
    case "stars": // Sortera efter antal gillningar
      games.sort((a, b) => b.stars - a.stars);
      break;
    case "recommend": // Slumpmässig ordning
      games.sort(() => Math.random() - 0.5);
      break;
    default:
      // Om inget giltigt sorteringskriterium hittades, använd standardordning
      return;
  }
}
