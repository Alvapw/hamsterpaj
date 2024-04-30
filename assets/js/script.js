const menuIcon = document.querySelector("[data-fn-toggle-menu]");
const menuList = document.querySelector("[data-nav-list]");

menuIcon.addEventListener("click", function () {
  menuList.classList.toggle("active");
  menuIcon.classList.toggle("exit");
});
