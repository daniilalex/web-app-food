//add selector as an argument to all methods, for easier work with code
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
//add second parameter with id value, if modalTimerId is open, clear interval
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //modal windows with an attribute([data-modal])
  const modalTrigger = document.querySelectorAll(triggerSelector),
    //modal window with modal & hide class
    modal = document.querySelector(modalSelector, modalTimerId);

  //important sintaxys: after click use anom arrow function(only this sintaxys can call a function with arguments)
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
export default modal;
export { closeModal };
export { openModal };
