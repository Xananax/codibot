const setupBot = require("./eris");

// later, we will just instantiate the bot on first run with the api key
// setupBot()
// since we can't store secrets on codesandbox, we will run it from the front-end, with a key provided from the user in /bot?key=blah blah

module.exports = setupBot;
