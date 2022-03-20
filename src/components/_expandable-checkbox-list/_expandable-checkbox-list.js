'use strict';

const expandableCheckboxListCollection = document.querySelectorAll('.js-expandable-checkbox-list');

function expandableCheckboxListHandler(e) {
  const thisExpandableCheckboxList = e.currentTarget;
  const dropBtn = thisExpandableCheckboxList.querySelector('.js-expandable-checkbox-list__drop-btn');

  if (e.target == dropBtn) {
    thisExpandableCheckboxList.classList.toggle('expandable-checkbox-list_open');
    dropBtn.classList.toggle('expandable-checkbox-list__drop-btn_arrow-up');
  }
}

expandableCheckboxListCollection.forEach(expandableCheckboxList => expandableCheckboxList.addEventListener('click', expandableCheckboxListHandler));
