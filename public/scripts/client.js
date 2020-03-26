/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
}

const createTweetElement = function(tweet) {
  const {name, handle, avatars} = tweet.user;
  const post = tweet.content.post;
  const fDate = new Date(date.created_at);
  const date = (fDate.getUTCMonth() + 1) + "/" + fDate.getUTCDate() + "/" + fDate.getFullYear();
  return `
  <article class="tweet">
  <header>
    <div>
      <span class="avatar"><img src = ${avatars}></span>
      <span class="name">${name}</span>
    </div>
    <span class="handle">${handle}</span>
  </header>
  <p class="tweetInfo"> ${post}</p>
  <footer>
    <span class="date">Created on: ${date}</span>
    <span class ="icons"> &#127988 &#128257 &#128153</span>
  </footer>
  </article>`
}

renderTweets(data);

