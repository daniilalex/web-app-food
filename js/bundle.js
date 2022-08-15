/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Price:</div>
                  <div class="menu__item-total"><span>${this.price}</span> eu/day</div>+
              </div>
          `;
      this.parent.append(element);
    }
  }

  //call function getData which iterates throw object and destructive object on single variables put them into constructor class which is creating a new card and render it
  (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getData)("http://localhost:3000/menu").then((data) =>
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    })
  );
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



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

      (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);

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
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 5000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//use destructorization method
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  let slideIndex = 1;
  let offset = 0; //to set right or left offset

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width; //get the div width, where slides are located

  //show or not 0 befor number
  function slidesTextNumber() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  function dotOpacity() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1; //highlight last dot
  }
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  //if slides are less than 10, add 0 number before total & currents value else do not add
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = slides.length * 100 + "%"; //for adding all slides to the slider inner div
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  //convert all slides width to the default wrapper div width
  slides.forEach((slide) => (slide.style.width = width));

  //add relative position to sider div, for correct elements displaying with absolute position
  slider.style.position = "relative";

  //create new element(div,ul) for all dots
  const indicators = document.createElement("ol");

  //create array for using our dots with array methods
  const dots = [];

  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  //create dots that relate(otnosiatsia) to the slides
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1); //set attribute and number for each dot
    dot.classList.add("dot");
    //highlight dot
    if (i === 0) {
      dot.style.opacity = 1;
    }
    dots.push(dot);
    indicators.append(dot);
  }

  next.addEventListener("click", () => {
    //when our slider is located at the last position, we return it to the first position.
    //transform returns to strating position, 0px
    //width.slice - cuts 2 last chars from width(500px), 0 start, second parameter shows how many elements need to cut * all slides length minus one unit
    if (offset === deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      //if not last slider, add slider width for changing slide
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`; //how much to move element to the left

    //if slideindex equal last slidindex, returns to starting position
    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      //increase index by 1 ubit
      slideIndex++;
    }
    slidesTextNumber();
    dotOpacity();
  });
  prev.addEventListener("click", () => {
    //when we know that it is first slide we move it to the end
    if (offset === 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      //if it is not the first slider, we will minus slider width i am moving
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    //if index equal first slide index, returns to ending position
    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      //minus index by 1 unit
      slideIndex--;
    }
    slidesTextNumber();
    dotOpacity();
  });

  //add listener to every dot in the slider
  //dot === slide number && index
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo; //index = dot number
      //dot width * last dot
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      slidesTextNumber();
      dotOpacity();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  //if we click on parent div(tabs item div) where element has correct class list, itterate throw tabs where target equel element and do next functions. slice remowe first char(.) from string
  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (e.target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
  const deadline = "2022-08-23";

  function getTimeRemainig(endtime) {
    //function task is to get total time difference
    const t = Date.parse(endtime) - Date.parse(new Date()); // we get a milisec difference in the endtime
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); //total days before sale, count amount days which are left untill sale = t(difference msec) divede on / (msec in min * msec in 1 hour * msec in 1 day)
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); //total hours before sale,  (total difference time / milisec in one hour) % 24(hours a day) = 48 hours and rest 2 hours which will be displayed in hours tab
    const minutes = Math.floor((t / 1000 / 60) % 60); // total minutes
    const seconds = Math.floor((t / 1000) % 60); //total sec

    return {
      //return object from function
      total: t, // total amount of miliseconds
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000); //run fn update clock every second

    function updateClock() {
      //remaining time calculation
      const t = getTimeRemainig(endtime); //return object with all data

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        //t.total(total amount of milliseconds <= 0 ) turn off update timer
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//function post data to the server
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await result.json(); //return promise (js object)
};

//function of getting resources(data) from server
const getData = async (url) => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }
  return await result.json(); //return promise (js object)
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/food.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");









window.addEventListener("DOMContentLoaded", () => {
  //to the modalTimerId add modaltimer id, start function openModal(modal window selector and unique timer id ) & resolve after n time
  const modalTimerId = setTimeout(
    () => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_2__.openModal)(".modal", modalTimerId),
    300000
  );
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    ".tabheader__item_active"
  );
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(".timer", "2022-08-11");
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map