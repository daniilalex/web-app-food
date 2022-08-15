function calc() {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  //add default value to the local storage
  localStorage.getItem("sex")
    ? (sex = localStorage.getItem("sex"))
    : (sex = "female");
  localStorage.setItem("sex", "female");

  localStorage.getItem("ratio")
    ? (ratio = localStorage.getItem("ratio"))
    : (ratio = "1.375");
  localStorage.setItem("ratio", "1.375");

  //compare with local storage & highlight(put active class) to the sex & ration inputs
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }
  //add div selector to the first argument, beacause we add class to all blocks in these selectors
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  //calculate ratio for man & women, must use it in every methods below
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "----------";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotal();

  //get values from static inputs (sex & ratio)
  function getStaticValue(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticValue("#gender div", "calculating__choose-item_active"); //get gender, add div selector to apply a class to all blocks in these selectors
  getStaticValue(
    ".calculating__choose_big div", //add div after class
    "calculating__choose-item_active"
  ); //get ratio value, took parent-div by class which is different

  //get input's value
  function getDynamicValue(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      //validation for numbers, if not a number put a red border
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;

          break;
        case "weight":
          weight = +input.value;

          break;
        case "age":
          age = +input.value;

          break;
      }
      calcTotal();
    });
  }
  getDynamicValue("#height");
  getDynamicValue("#weight");
  getDynamicValue("#age");
}

export default calc;
