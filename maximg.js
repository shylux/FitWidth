let imageRatio;

/**
 * Checks if there is exactly one IMG tag on the page.
 * This is true for the chrome image view. False positives are possible, but i haven't seen one in 4 years.
 * @returns {boolean}
 */
function isChromeImageRepActive() {
  return ($('body').children().length === 1 &&
          $('body > *').prop('tagName') === 'IMG')
}

/**
 * chrome sets the height on the body to the original image height.
 * This function patches the height according to the image ratio when the FitWidth view is active.
 */
function fixImageSizes() {
  let display = $('#maximg');
  let body = $('body');
  let targetHeight = body.width() / imageRatio;
  display.height(targetHeight);
  if (display.is(':visible'))
    body.height(targetHeight);
  else
    body.css('height', '');
}

/**
 * First make a copy of the image on the page. Then swap it in when its time to display the additional zoom mode.
 * The copy is needed because i don't have any script control over the original image.
 */
if (isChromeImageRepActive()) {
  // make copy of image to be swapped in
  let orig = $('img').first();
  orig.hide();
  let display = $('<img src="" alt="" id="maximg" />');
  display.attr('src', orig.attr('src'));
  $('body').append(display);

  // get image ratio
  let img = orig.get(0);
  imageRatio = img.naturalWidth / img.naturalHeight;

  // update dimensions on resize
  fixImageSizes();
  $(window).on('resize', fixImageSizes);

  // switch between the native image scales and my additional one
  display.click(function() {
    display.hide();
    fixImageSizes();
    orig.show();
  });
  orig.click(function() {
    if ($(this).hasClass('zoom-again')) {
      $(this).removeClass('zoom-again');
      orig.hide();
      display.show();
      fixImageSizes();
    } else {
      $(this).addClass('zoom-again');
      $(this).css('cursor', 'zoom-in');
    }
  });
}
