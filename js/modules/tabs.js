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

export default tabs;
