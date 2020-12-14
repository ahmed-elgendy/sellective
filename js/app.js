const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const formm = document.querySelector(".formm");

sign_up_btn.addEventListener("click", () => {
  formm.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  formm.classList.remove("sign-up-mode");
});
