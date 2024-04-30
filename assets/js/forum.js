let forumThreads = [];
const filters = {
  tags: [],
  search: "",
};
const articleTeaserTemplate = document.querySelector(
  "[data-article-teaser-template]"
);
const forumFeed = document.querySelector("[data-forum-feed]");
const searchInput = document.querySelector("[data-search]");
const tags = document.querySelectorAll("[data-tag]");

searchInput.addEventListener("input", (e) => {
  const valueInput = e.target.value.toLowerCase();
  filters.search = valueInput;
  render();
});
fetch("assets/json/forumData.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((thread) => {
      //forumThreads.push({ filtered: false, domNode: null, ...recept });
      forumThreads.push(thread);
    });
    render();
  })
  .catch((error) => console.log(error));
function createArticleTeaser(thread) {
  const article = articleTeaserTemplate.content.cloneNode(true).children[0];

  const createdDate = article.querySelector("[data-replace-created-date]");
  createdDate.textContent = thread.dateStarted;

  const updatedDate = article.querySelector("[data-replace-updated-date]");
  updatedDate.textContent = thread.dateUpdated;

  const heading = article.querySelector("[data-replace-heading]");
  heading.textContent = thread.title;

  const text = article.querySelector("[data-replace-text]");
  text.textContent = thread.text;

  const userName = article.querySelector("[data-replace-username]");
  userName.textContent = thread.userName;

  const likes = article.querySelector("[data-replace-likes]");
  likes.textContent = thread.likes;

  const comments = article.querySelector("[data-replace-comments]");
  comments.textContent = thread.comments;
  const tagsContainer = article.querySelector(".c-article__border-box");
  thread.tags.forEach((tag) => {
    console.log(tag);
    const spanTag = document.createElement("span");
    spanTag.classList.add("c-badge");
    spanTag.textContent = tag;
    tagsContainer.append(spanTag);
  });

  //   link.setAttribute("href", recept.html);
  //   header.textContent = recept.name;
  forumFeed.append(article);
}
function render() {
  console.log(filters.search);
  let filteredThreads = [...forumThreads];
  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredThreads = filteredThreads.filter((r) =>
      r.name.toLowerCase().includes(search)
    );
  }
  if (filters.tags.length > 0) {
    filteredThreads = filteredThreads.filter((r) =>
      filters.tags.every((f) => r.tags.includes(f))
    );
  }
  forumFeed.innerHTML = "";
  filteredThreads.forEach((thread) => createArticleTeaser(thread));
}
tags.forEach((chip) => {
  chip.addEventListener("change", (e) => {
    const currentTag = e.target.dataset.caty;
    toggleItemArray(currentTag, filters.tags);
    render();
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
  console.log(array);
}
