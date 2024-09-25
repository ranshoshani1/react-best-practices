const button = document.querySelector("button");
let isActive = false;

button.addEventListener("click", () => {
  isActive = !isActive;
  button.textContent = isActive ? "Active" : "Inactive";
});
