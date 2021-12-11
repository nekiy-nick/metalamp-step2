'use strict';

let likeBtn = document.querySelectorAll('.js-like-button');

const checkBtnNumLength = btn => btn.textContent.length;

const changeWidthBtn = btn => {
  switch ( checkBtnNumLength(btn) ) {
    case 3:
      btn.classList.add('like-button_hundred');
      btn.classList.remove('like-button_thousand');
      break;
    case 4:
      btn.classList.add('like-button_thousand');
      btn.classList.remove('like-button_hundred');
      break;
    default:
      btn.classList.remove('like-button_hundred');
      btn.classList.remove('like-button_thousand');
      break;
  }
};

for (let i = 0; i < likeBtn.length; i += 1) {

  changeWidthBtn(likeBtn[i]);

  likeBtn[i].addEventListener('click', e => {
    const thisBtn = e.currentTarget;
    const isActive = btn => btn.getAttribute('data-active');

    let likeCounter = Number(thisBtn.textContent);

    thisBtn.classList.toggle('like-button_active');

    if ( isActive(thisBtn) ) {
      thisBtn.removeAttribute('data-active')
      likeCounter -= 1;
    } else {
      thisBtn.setAttribute('data-active', 'true');
      likeCounter += 1;
    }

    thisBtn.textContent = likeCounter;
    changeWidthBtn(thisBtn);
  });
}