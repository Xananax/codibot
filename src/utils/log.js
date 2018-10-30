/**
 * logs anything and returns the first passed item, useful for fp logging
 * @param { string } text a title for the log line
 * @param { ...any } things to log
 * @return any the first logged thing
 **/
module.exports = text => (ret, ...what) => (console.log(`[ ${text} ] `, ...what), ret)
