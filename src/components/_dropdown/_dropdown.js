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
  let isSeparately = dropdown.dataset.countSeparately;
  let defaultItemTextValue = initialTitle || 'Dropdown title not set';

  function counter(items, justInteger = false) {
    let filterChangedItems = [...items].filter(item => {
      let count = Number(item.querySelector('.js-dropdown__count-int').innerText);
      return count > 0;
    });

    let resultString = '';

    if (justInteger) {
      resultString = filterChangedItems.reduce((accumString, item) => {
        let count = Number(item.querySelector('.js-dropdown__count-int').innerText);
        return accumString += count;
      }, 0);
      filterChangedItems.length === 0 ? resultString = '' : resultString += ` ${isSeparately}`;
    } else {
      resultString = filterChangedItems.reduce((accumString, item) => {
        let itemTitle = item.querySelector('.js-dropdown__item-title').innerText.toLowerCase();
        let count = item.querySelector('.js-dropdown__count-int').innerText;
        return accumString += `${count} ${itemTitle}, `
      }, '');
    }

    return resultString;
  }

  if (isSeparately) {
    let unityItems = [...items].filter(item => item.dataset.itemSeparately);
    let separateItems = [...items].filter(item => !item.dataset.itemSeparately);
    let resultUnityString = counter(unityItems, true);
    let resultSeparateString = counter(separateItems);

    dropdownTitle.innerText = `${resultUnityString ? resultUnityString + ', ' : ''}${resultSeparateString}`.slice(0, -2) || defaultItemTextValue;
    return;
  }

  let resultString = counter(items);

  resultString = resultString.slice(0, -2);
  dropdownTitle.innerText = resultString || defaultItemTextValue;

  return resultString || defaultItemTextValue;
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

function clearItemsDefault(items) {
  items.forEach(item => {
    const initialCount = Number(item.dataset.minimum);
    const minusBtn = item.querySelector('.js-dropdown__item-btn[data-btn-value="-"]');
    const plusBtn = item.querySelector('.js-dropdown__item-btn[data-btn-value="+"]');
    const maximumValue = Number(item.dataset.maximum);
    const itemCount = item.querySelector('.js-dropdown__count-int');

    initialCount < maximumValue ? plusBtn.removeAttribute('disabled') : plusBtn.setAttribute('disabled', '');
    itemCount.innerText = initialCount;
    minusBtn.setAttribute('disabled', '');
  })
}

function removeDisabledBtn(btn) {
  btn.removeAttribute('disabled');
}

function checkChangeItemOnce(items) {
  for (let item of items) {
    const initialCount = item.dataset.minimum;
    const nowCountValue = item.querySelector('.js-dropdown__count-int').innerText;

    if (initialCount !== nowCountValue) {
      return true;
    }
  }

  return false;
}

function dropdownHandler(e) {
  const items = this.querySelectorAll('.js-dropdown__item');
  const dropBtn = this.querySelector('.js-dropdown__drop-btn');

  const footerButtons = {
    clear: this.querySelector('.js-dropdown__footer-btn_clear'),
    apply: this.querySelector('.js-dropdown__footer-btn_apply'),
  }

  if (e.target === dropBtn) {
    toggleDropdown(e.currentTarget);
  }

  items.forEach(item => item.addEventListener('click', computeCount));

  if (e.target.classList.contains('js-dropdown__item-btn')) {
    countItems(e.currentTarget);
  }

  if (e.target == footerButtons.clear) {
    clearItemsDefault(items);
    countItems(e.currentTarget);
    footerButtons.clear.setAttribute('disabled', '');
  }

  if (e.target == footerButtons.apply) {
    toggleDropdown(e.currentTarget);
  }

  if (footerButtons.clear) {
    checkChangeItemOnce(items) ? removeDisabledBtn(footerButtons.clear) : footerButtons.clear.setAttribute('disabled', '');
  }
}

dropdownCollection.forEach(dropdown => dropdown.addEventListener('click', dropdownHandler));
