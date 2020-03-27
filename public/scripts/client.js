$(() => {

  // our holy grail form .. collects information and submits if correct
  const $form = $("#nTweet");
  $form.submit(function(event) {
    event.preventDefault();
    if (checkTweetValidity()) {
      $.ajax({
        url:"/tweets",
        type: "POST",
        data: $(this).serialize(),
        success: () => {
          $form[0].reset();
          loadTweets();
        }
      })
    }
  })
  // loading page
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      datatype: "json",
      success: (response => {
      renderTweets(response);
    })
    });
  }
  loadTweets()

  // cross-site scripting
  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  }

  // took my html and creating tweets here
  const createTweetElement = function(info) {
    const fullDate = new Date(info.created_at);
    const date = (fullDate.getUTCMonth() + 1) + "/" + fullDate.getUTCDate() + "/" + fullDate.getFullYear();
    return `
    <article class="tweet">
    <header>
      <div>
        <span class="avatar"><img src = ${info.user.avatars}></span>
        <span class="name">${info.user.name}</span>
      </div>
      <span class="handle">${info.user.handle}</span>
    </header>
    <p class="tweetInfo"> ${escape(info.content.text)}</p>
    <footer>
      <span class="date">Created on: ${date}</span>
      <span class ="icons"> &#127988 &#128257 &#128153</span>
    </footer>
    </article>`
  }
  // tweet is in order by last tweet created to oldest .. also rendered
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  }

  // is tweet valid?
  const checkTweetValidity = () => {
    const length = $("#tweet-text").val().length;
    $("#empty, #max").removeClass("invalid").slideUp(300)
    if (length > 140) {
      $("#max")
        .addClass("invalid")
        .slideDown(500);
      return false;

    } else if (length === 0) {
      $("#empty")
        .addClass("invalid")
        .slideDown(500);
      return false
    }
    else return true
  }

})