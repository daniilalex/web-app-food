import { openModal, closeModal } from "./modal.js";
import { postData } from "../services/services.js";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/forms/Animation_2.svg",
    success: "Thank you! We will contact you soon",
    failure: "Something went wrong...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      //put element at the end of div
      form.insertAdjacentElement("afterend", statusMessage);
      //collect all values from the form
      const formData = new FormData(form);

      //take FORM values, convert to the array first(entries), then convert to the object(fromEntries) and only then convert to JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
      </div>
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 5000);
  }
}
export default forms;
