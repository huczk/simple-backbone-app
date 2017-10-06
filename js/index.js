// JQuery functions to control active menu link
$(function() {
  $(`li a[href^="${location.hash}"]`).addClass('active');
});

$( "a" ).click(function() {
  $('li a').removeClass("active");
  $(this).addClass("active");
});
