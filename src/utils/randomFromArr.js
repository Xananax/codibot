const random = require('random')
module.exports = (arr) => arr[random.int(0, arr.length - 1)]