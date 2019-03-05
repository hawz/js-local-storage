"use strict";
(function() {
  // we get the elements we need
  const addItems = document.querySelector(".add-items");
  const clearAll = document.querySelector("#clear-all");
  const checkAll = document.querySelector("#check-all");
  const uncheckAll = document.querySelector("#uncheck-all");
  const itemsList = document.querySelector(".plates");
  // on pageload we check if there is something in localStorage and we set items equal to that.
  let items = JSON.parse(localStorage.getItem("items")) || [];

  function addItem(e) {
    e.preventDefault();
    const text = this.querySelector("[name=item]").value;
    const item = {
      text,
      done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
      .map((plate, i) => {
        return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${
          plate.done ? "checked" : ""
        } />
            <label for="item${i}">${plate.text}</label>
          </li>
        `;
      })
      .join("");
  }

  function toggleDone(e) {
    if (!e.target.matches("input")) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }

  function clearAllPlates(e) {
    items = [];
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }

  function checkAllPlates(e) {
    items.forEach(item => item.done = true);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }

  function uncheckAllPlates(e) {
    items.forEach(item => item.done = false);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }

  addItems.addEventListener("submit", addItem);
  itemsList.addEventListener("click", toggleDone);
  clearAll.addEventListener("click", clearAllPlates);
  checkAll.addEventListener("click", checkAllPlates);
  uncheckAll.addEventListener("click", uncheckAllPlates);

  // we populate the list with the items fetched from the localStorage (or with an empty array...)
  populateList(items, itemsList);
})();
