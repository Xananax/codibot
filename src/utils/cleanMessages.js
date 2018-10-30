/**
 * Cleans a received message
 * replaces slashes, extra spaces, removes the command character
 * @param { string } msg the received message
 * @return { string } the cleaned message
 **/
module.exports = msg =>
  msg
    .replace(/^\/*|\/*$/g, "") //remove starting and ending slash
    .trim() //remove starting and ending space
    .replace(/^!(.*?)\s|\n/, "!$1 ")
    .replace(/<.*?>/g, "") //replace mentions
    .replace(/(\s)+/g, "$1") // replace double spaces with single spaces
    .replace(/^todo:?\s?/, "todo ")
    .trim(); // remove starting and ending space again
