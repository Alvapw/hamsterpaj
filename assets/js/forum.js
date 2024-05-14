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
  console.log(thread);
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
    // console.log(tag);
    const spanTag = document.createElement("span");
    spanTag.classList.add("c-tag");
    spanTag.textContent = tag;
    tagsContainer.append(spanTag);
  });

  // spottar ut kortet i rätt container
  forumFeed.append(post);
}

// funktion för att rendera ut korten
function render(data) {
  let filteredThreads = [...forumThreads];

  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredThreads = filteredThreads.filter((r) =>
      r.title.toLowerCase().includes(search)
    );
  }

  if (data) {
    filteredThreads = filteredThreads.filter((r) => r.tags.includes(data));
  }

  // if (data) {
  //   filteredThreads = filteredThreads.filter((r) => r.category.includes(data));
  // }

  forumFeed.innerHTML = "";
  filteredThreads.forEach((thread) => createPostTeaser(thread));
}

// HELP de fungerar inte tillsammans

// console.log(tags);
tags.forEach((tag) => {
  // console.log(tag);
  tag.addEventListener("click", (e) => {
    console.log(e.target.dataset.tag);
    const currentTag = e.target.dataset.tag;
    // toggleItemArray(currentTag, filters.tags);
    render(currentTag);
  });
});

catys.forEach((caty) => {
  caty.addEventListener("click", (e) => {
    console.log(e.target.dataset.caty);
    const currentCaty = e.target.dataset.caty;
    render(currentCaty);
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
  // console.log(array);
}
