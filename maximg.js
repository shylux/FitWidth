
function is_chrome_image_rep_active() {
  return ($('body').children().length === 1 &&
          $('body > *').prop('tagName') === 'IMG')
}

if (is_chrome_image_rep_active()) {
  let orig = $('img').first();
  orig.hide();
  let display = $('<img src="" alt="" id="maximg" />');
  display.attr('src', orig.attr('src'));
  $('body').append(display);

  display.click(function() {
    display.hide();
    orig.show();
  });

  orig.click(function() {
    if ($(this).hasClass('zoom-again')) {
      $(this).removeClass('zoom-again');
      orig.hide();
      display.show();
    } else {
      $(this).addClass('zoom-again');
      $(this).css('cursor', 'zoom-in');
    }
  });
}
