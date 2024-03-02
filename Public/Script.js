
//sidebar toggle
const togglebtn = document.querySelector(".toggle-btn");

togglebtn.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

 
const sidebaritem = document.querySelector(".sidebar-nav");
sidebaritem.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.add("expand");
});

const main = document.querySelector(".main");
main.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.remove("expand");
});