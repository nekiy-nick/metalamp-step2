const dropdown = $('.js-dropdown');

dropdown.on('click', function(e) {

  const header = $(this).children('.js-dropdown__header');
  const body = header.next();
  let title = $(this).find('.js-dropdown__title');
  let dropBtn = $(this).find('.js-dropdown__drop-btn');
  let element = $(e.target);
  
  if (element.hasClass('js-dropdown__drop-btn')) {
    $('.js-dropdown__body:visible').not(body).slideUp();
    body.slideToggle(400);
  }
  console.dir(dropBtn, element)
});