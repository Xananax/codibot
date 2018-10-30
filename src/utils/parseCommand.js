/**
 * Parses a line of text into command and arguments.
 * cleans up extra spaces and splits on spaces.
 * A command is only parsed if it begins with "!"
 * @param { string } text the passed line of text
 * @return { [ string, string[] ] } the command, and the array of arguments
 **/
module.exports = text => {
  const parts = text.split(" ");
  if (parts[0][0] === "!") {
    const [rawCommand, ...args] = parts;
    const command = rawCommand
      .replace(/\n+/g, "")
      .replace(/^!/, "") // replace starting "!"
      .replace(/\s+/g, "")
      .trim()
      .toLowerCase();
    return [command, args];
  }
  return ["", parts];
};