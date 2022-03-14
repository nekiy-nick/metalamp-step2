'use strict';

window.addEventListener('load', function(e) {
  let listOfMinusBtn = document.querySelectorAll('.js-dropdown__item-btn[data-btn-value="-"]');

  listOfMinusBtn.forEach(minusBtn => minusBtn.setAttribute('disabled', ''));

  let dropdownsList = document.querySelectorAll('.js-dropdown');
  dropdownsList.forEach(dropdown => countItems(dropdown));
});

function countItems(dropdown) {
  let items = dropdown.querySelectorAll('.js-dropdown__item');
  let initialTitle = dropdown.querySelector('.js-dropdown__title').dataset.title;
  let dropdownTitle = dropdown.querySelector('.js-dropdown__title');

  let filterChangedItems = [...items].filter(item => {
    let count = item.querySelector('.js-dropdown__count-int').innerText;
    return count > 0;
  });

  let resultString = filterChangedItems.reduce((accumString, item) => {
    let itemTitle = item.querySelector('.js-dropdown__item-title').innerText.toLowerCase();
    let count = item.querySelector('.js-dropdown__count-int').innerText;
    return accumString += `${count} ${itemTitle}, `
  }, '');

  resultString = resultString.slice(0, -2);
  dropdownTitle.innerText = resultString || initialTitle || 'Dropdown title not set';

  return resultString || initialTitle || 'Dropdown title not set';
}

const dropdownCollection = document.querySelectorAll('.js-dropdown');

function switchDisabledBtn(item, btn, limit = 0) {
  let itemCount = item.querySelector('.js-dropdown__count-int').innerText;

  parseInt(itemCount) === parseInt(limit) ? btn.setAttribute('disabled', '') : btn.removeAttribute('disabled');
}

function computeCount(e) {
  let counter = this.querySelector('.js-dropdown__count-int');
  let plusBtn = this.querySelector('.js-dropdown__item-btn[data-btn-value="+"]');
  let minusBtn = this.querySelector('.js-dropdown__item-btn[data-btn-value="-"]');
  let minimumLimit = this.dataset.minimum || 0;
  let maximumLimit = this.dataset.maximum || 900;

  if (e.target.classList.contains('js-dropdown__item-btn')) {
    switch (e.target.dataset.btnValue) {
      case '+' :
        counter.innerText = parseInt(counter.innerText) + 1;
      break;
      case '-':
        counter.innerText = parseInt(counter.innerText) - 1;
      break;
      default:
        console.warn(`${e.target} is not exist dataset value`);
      break;
    }
  }

  switchDisabledBtn(this, plusBtn, maximumLimit);
  switchDisabledBtn(this, minusBtn, minimumLimit);
}

function toggleDropdown(dropdown) {
  dropdown.classList.toggle('dropdown_open');
}

function dropdownHandler(e) {
  const items = this.querySelectorAll('.js-dropdown__item');
  const dropBtn = this.querySelector('.js-dropdown__drop-btn');

  if (e.target === dropBtn) {
    toggleDropdown(e.currentTarget);
  }

  items.forEach(item => item.addEventListener('click', computeCount));

  if (e.target.classList.contains('js-dropdown__item-btn')) {
    countItems(e.currentTarget);
  }
}

dropdownCollection.forEach(dropdown => dropdown.addEventListener('click', dropdownHandler));
