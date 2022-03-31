'use strict';

const navDropdownSubmenu = document.querySelectorAll('.js-header-block-nav__item_submenu');

function handlerDropSubmenu(e) {
  const submenu = e.currentTarget.querySelector('.js-header-block-nav-submenu');
  submenu.classList.toggle('header-block-nav-submenu_active');
}

navDropdownSubmenu.forEach(btn => btn.addEventListener('click', handlerDropSubmenu));
