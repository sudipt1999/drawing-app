const popup = document.getElementById("onstart-popup");
const outer = document.getElementById("outer-popup");
const closeBtn = document.getElementById("popup-close");

const closePopup = () => {
  popup.style.display = "none";
  outer.style.display = "none";
};

outer.addEventListener("click", closePopup);
closeBtn.addEventListener("click", closePopup);
