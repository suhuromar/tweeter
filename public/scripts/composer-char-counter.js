$(() => {
  $("#tweet-text").on("keyup keydown", function() {
    let tweetLength = $(this).val().length;
    let remainder = $(this).siblings(".counter")[0];
    remainder.value = 140 - tweetLength;
    if (remainder.value < 0) {
      $remainder.addClass("invalid");
    } else {
      $remainder.removeClass("invalid");
    }
  });
});