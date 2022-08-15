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
export default slider;
