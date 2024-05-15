let forumThreads = [];
const filters = {
  tags: [],
  category: [],
  search: "",
};
const postTeaserTemplate = document.querySelector(
  "[data-post-teaser-template]"
);
const forumFeed = document.querySelector("[data-forum-feed]");
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

// hämtar json data och pushar in det i arrayen forumThreads
fetch("assets/json/forumData.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((thread) => {
      forumThreads.push(thread);
    });
    render();
  })
  .catch((error) => console.log(error));

// funktion för att skapa korten
function createPostTeaser(thread) {
  // klonar template
  const post = postTeaserTemplate.content.cloneNode(true).children[0];

  // byter ut datan i kortet
  const coverImgMobile = post.querySelector("[data-replace-mobile-cover-img]");
  coverImgMobile.setAttribute("srcset", thread.coverImgMobile);

  const coverImgDesktop = post.querySelector(
    "[data-replace-desktop-cover-img]"
  );
  coverImgDesktop.setAttribute("srcset", thread.coverImgDesktop);

  const createdDate = post.querySelector("[data-replace-created-date]");
  createdDate.textContent = thread.dateStarted;

  const updatedDate = post.querySelector("[data-replace-updated-date]");
  updatedDate.textContent = thread.dateUpdated;

  const title = post.querySelector("[data-replace-title]");
  title.textContent = thread.title;

  const text = post.querySelector("[data-replace-text]");
  text.textContent = thread.text;

  const profileImg = post.querySelector("[data-replace-profile-img]");
  profileImg.setAttribute("src", thread.profileImg);

  const userName = post.querySelector("[data-replace-username]");
  userName.textContent = thread.userName;

  const likes = post.querySelector("[data-replace-likes]");
  likes.textContent = thread.likes;

  const comments = post.querySelector("[data-replace-comments]");
  comments.textContent = thread.comments;

  // filtrerar ut hur många och vilka tags som ska skrivas ut i kortet och skapar elementet med rätt class
  const tagsContainer = post.querySelector("[data-replace-tags]");
  thread.tags.forEach((tag) => {
    const spanTag = document.createElement("span");
    spanTag.classList.add("c-tag");
    spanTag.textContent = tag;
    tagsContainer.append(spanTag);
  });

  if (thread.trending === true) {
    post.querySelector("[data-post]").classList.add("trending");
  }

  // spottar ut kortet i rätt container
  forumFeed.append(post);
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
    sortThreads(currentSort);
    render();
    // ändrar heading innehåll beroende på vilken sortering som är aktuell
    const feedHeading = document.querySelector("[data-replace-feed-heading]");
    if (currentSort === "time") {
      feedHeading.textContent = "Senaste inläggen";
    }
    if (currentSort === "popular") {
      feedHeading.textContent = "Populära inlägg";
    }
    if (currentSort === "recommend") {
      feedHeading.textContent = "Rekommenderade inlägg för dig";
    }
  });
});

function render() {
  let filteredThreads = [...forumThreads];

  // Filtrera efter sökning
  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredThreads = filteredThreads.filter((thread) =>
      thread.title.toLowerCase().includes(search)
    );
  }

  // Filtrera efter vald kategori
  if (currentCategory) {
    filteredThreads = filteredThreads.filter((thread) =>
      thread.category.includes(currentCategory)
    );
  }

  // Filtrera efter vald tagg
  if (currentTag) {
    filteredThreads = filteredThreads.filter((thread) =>
      thread.tags.includes(currentTag)
    );
  }

  // Sortera
  if (currentSort) {
    sortThreads(currentSort);
  }

  forumFeed.innerHTML = "";
  filteredThreads.forEach((thread) => createPostTeaser(thread));
}

function sortThreads(criteria) {
  switch (criteria) {
    case "time": // Sortera efter datum
      forumThreads.sort((a, b) => new Date(a.id) - new Date(b.id));
      break;
    case "popular": // Sortera efter antal gillningar
      forumThreads.sort((a, b) => b.likes - a.likes);
      break;
    case "recommend": // Slumpmässig ordning
      forumThreads.sort(() => Math.random() - 0.5);
      break;
    default:
      // Om inget giltigt sorteringskriterium hittades, använd standardordning
      return;
  }
}
