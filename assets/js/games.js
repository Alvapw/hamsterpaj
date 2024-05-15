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

  // spottar ut kortet i rätt container
  gameFeed.append(gameTeaser);
}
let ok;
tags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    const currentTag = e.target.dataset.tag;
    ok = "tag";
    render(currentTag, ok);
  });
});

catys.forEach((caty) => {
  caty.addEventListener("click", (e) => {
    const currentCaty = e.target.dataset.caty;
    ok = "caty";
    saveCategory = currentCaty;
    render(currentCaty, ok);
  });
});

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

// CHATGPT
function render(data, check) {
  let filteredGames = [...games];

  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredGames = filteredGames.filter((r) =>
      r.title.toLowerCase().includes(search)
    );
  }

  if (check === "tag") {
    if (saveCategory) {
      // Om det finns en sparad kategori, använd den
      filteredGames = saveFilter.filter(
        (r) => r.tags.includes(data) && r.category.includes(saveCategory)
      );
    } else {
      // Om ingen sparad kategori finns, filtrera endast efter tagg
      filteredGames = filteredGames.filter((r) => r.tags.includes(data));
    }
  }

  if (check === "caty") {
    if (data) {
      // Om en kategori väljs, spara den och filtrera korten
      saveCategory = data;
      filteredGames = filteredGames.filter((r) => r.category.includes(data));
      // Spara filtrerade trådar för att använda när man filtrerar efter taggar
      saveFilter = filteredGames;
    }
  }

  gameFeed.innerHTML = "";
  filteredGames.forEach((game) => createGameTeaser(game));
}
