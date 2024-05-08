// TILLFÄLLIGT ligger menu js här
const menuIcon = document.querySelector("[data-fn-toggle-menu]");
const headerSearch = document.querySelector("[data-header-search]");
const mainMenuList = document.querySelector("[data-main-menu]");
const headerBtn = document.querySelector("[data-header-btn]");

menuIcon.addEventListener("click", function () {
  headerSearch.classList.toggle("active");
  mainMenuList.classList.toggle("active");
  headerBtn.classList.toggle("active");
  menuIcon.classList.toggle("exit");
});

let forumThreads = [];
const filters = {
  tags: [],
  search: ""
};
const postTeaserTemplate = document.querySelector(
  "[data-post-teaser-template]"
);
const forumFeed = document.querySelector("[data-forum-feed]");
const searchInput = document.querySelector("[data-search]");
const tags = document.querySelectorAll("[data-tag]");
// console.log(tags);

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
  const coverImg = post.querySelector("[data-replace-cover-img]");

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
  // if (filters.tags.length > 0) {
  //   filteredThreads = filteredThreads.filter((r) =>
  //     filters.tags.every((f) => r.tags.includes(f))
  //   );
  // }
  if(data){
    filteredThreads = filteredThreads.filter((r) =>
    r.tags.includes(data));
  }
  forumFeed.innerHTML = "";
  filteredThreads.forEach((thread) => createPostTeaser(thread));
 
}

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

// hämtar alla dropdowns
const dropdowns = document.querySelectorAll("[data-fn-dropdown]");

// loopar igenom alla dropdowns
dropdowns.forEach((dropdown) => {
  // hämtar alla inre element i dropdowns
  const select = dropdown.querySelector("[data-dropdown-select]");
  const selected = dropdown.querySelector("[data-dropdown-selected]");
  const selectedIcon = dropdown.querySelector("[data-dropdown-selected-icon]");
  const caret = dropdown.querySelector("[data-dropdown-caret]");
  const list = dropdown.querySelector("[data-dropdown-list]");
  const options = dropdown.querySelectorAll("[data-dropdown-option]");
  const optionIcons = dropdown.querySelectorAll("[data-dropdown-option-icon]");

  // lägger till en lyssnare på select
  select.addEventListener("click", () => {
    // togglar active class på select
    select.classList.toggle("open");
    // togglar rotate class på caret
    caret.classList.toggle("rotate");
    // togglar open class på list
    list.classList.toggle("open");
  });

  // loopar igenom alla options
  options.forEach((option) => {
    // lägger till lyssnare på option
    option.addEventListener("click", () => {
      // console.log("click");
      // när ett option klickas på så ska selected innerText ändras till det klickade optionets innerText
      selected.innerText = option.innerText;
      // om det finns en icon ska selectedIcon bytas ut till optionIcon
      // TO-DO: byta ut ikon
      // tar bort classer som förut lades till
      select.classList.remove("open");
      caret.classList.remove("rotate");
      list.classList.remove("open");

      // loopar igenom alla options för att se om något option redan har classen active
      options.forEach((option) => {
        if (option.classList.contains("active")) {
          option.classList.remove("active");
        }
      });
      // sen kan vi lägga till active class på det klickade optionet
      option.classList.toggle("active");
    });
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
  // console.log(array);
}

