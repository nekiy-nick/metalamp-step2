'use strict';

const rateBtnCollection = document.querySelectorAll('.js-rate-button');

for (let i = 0; i < rateBtnCollection.length; i += 1) {
  rateBtnCollection[i].addEventListener('click', e => {

    const resetDefaultButtons = btnList => {
      for (let btn of btnList) {
        btn.textContent = 'star_border';
      }
    };

    const setRating = (btnList, mark) => {
      for (let i = 0; i < mark; i += 1) {
        btnList[i].textContent = 'star';
      }
    };

    const setDataRating = (ul, mark) => ul.setAttribute('data-rating', mark);

    const checkDataRating = ul => ul.getAttribute('data-rating');

    const removeDataRating = ul => ul.removeAttribute('data-rating');

    let thisBtn = e.target;
    let thisList = e.currentTarget;
    let thisItem = thisBtn.parentNode;
    let thisMark = thisItem.getAttribute('data-rating');
    let thisAllButtons = thisList.querySelectorAll('.js-rate-button__btn');
  
    resetDefaultButtons(thisAllButtons);

    if (checkDataRating(thisList) === thisMark) {
      removeDataRating(thisList);
      return;
    }

    setDataRating(thisList, thisMark);    
    setRating(thisAllButtons, thisMark);
  });
}