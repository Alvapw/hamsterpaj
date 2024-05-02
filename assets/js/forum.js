let forumThreads = [];
const filters = {
  tags: [],
  search: "",
};
const postTeaserTemplate = document.querySelector(
  "[data-post-teaser-template]"
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
function createPostTeaser(thread) {
  const post = postTeaserTemplate.content.cloneNode(true).children[0];

  const createdDate = post.querySelector("[data-replace-created-date]");
  createdDate.textContent = thread.dateStarted;

  const updatedDate = post.querySelector("[data-replace-updated-date]");
  updatedDate.textContent = thread.dateUpdated;

  const title = post.querySelector("[data-replace-title]");
  title.textContent = thread.title;

  const text = post.querySelector("[data-replace-text]");
  text.textContent = thread.text;

  const userName = post.querySelector("[data-replace-username]");
  userName.textContent = thread.userName;

  const likes = post.querySelector("[data-replace-likes]");
  likes.textContent = thread.likes;

  const comments = post.querySelector("[data-replace-comments]");
  comments.textContent = thread.comments;

  const tagsContainer = post.querySelector("[data-replace-tags]");
  thread.tags.forEach((tag) => {
    console.log(tag);
    const spanTag = document.createElement("span");
    spanTag.classList.add("c-badge");
    spanTag.textContent = tag;
    tagsContainer.append(spanTag);
  });

  //   link.setAttribute("href", recept.html);
  //   header.textContent = recept.name;
  forumFeed.append(post);
}
function render() {
  let filteredThreads = [...forumThreads];
  if (filters.search.length > 0) {
    const search = filters.search.toLowerCase();
    filteredThreads = filteredThreads.filter((r) =>
      r.title.toLowerCase().includes(search)
    );
  }
  if (filters.tags.length > 0) {
    filteredThreads = filteredThreads.filter((r) =>
      filters.tags.every((f) => r.tags.includes(f))
    );
  }
  forumFeed.innerHTML = "";
  filteredThreads.forEach((thread) => createPostTeaser(thread));
}
console.log(tags);
tags.forEach((tag) => {
  console.log(tag);
  tag.addEventListener("click", (e) => {
    console.log(tag);
    const currentTag = e.target.dataset.caty;
    toggleItemArray(currentTag, filters.tags);
    render();
  });
});
// const select = document.querySelector("#forum-sort");
// select.addEventListener("change", (e) => {
//   // const currentTag = e.options;
//   // console.log(this.value);
//   // toggleItemArray(currentTag, filters.tags);
//   // render();
// });
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
