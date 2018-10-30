const randomFromArr = require('../utils/randomFromArr')

const chooseAndReply = reply => (...messages) => {
  const msg = randomFromArr(messages)
  if(msg){
    reply(msg)
  }
  return false
}

const answer = ({ author, botIsMentioned, mentions, command, isCommand, args, content, reply, replyLater }) => {
  const mention = `<@${author.id}>`
  const botIsSubject = botIsMentioned || /codibot/i.test(content)
  const choose = chooseAndReply(reply)

  if (botIsSubject && /hello|hey/.test(content)) {
    return choose(`Hello ${mention}!`, `Hey ${mention}!`, `${mention}, how are you?`)
  }
  if (botIsSubject && /how.*?are.*?you/i.test(content)) {
    return choose(`I'm great! How are you?`, `I'm good thanks`, `I'm fine`)
  }
  if (/good night$/i.test(content)) {
    return choose(`good night to you too`, `bye`, `gn`, `sweet dreams`)
  }
  if (/bye!?$/i.test(content)) {
    return reply(`bye ${mention}!`)
  }
  if (botIsSubject && /thanks?/i.test(content)) {
    return choose(`don't mention it`, `yw`, `walaw`, `np`, `you are most welcome, ${mention}`)
  }
  if (botIsSubject && /stupid/i.test(content)) {
    return reply(`:cry:`)
  }
  if (/(hah?ha\s?)+|lol/i.test(content)) {
    return choose(`huhuhuhu`, `hehehe`, `hah`, ``, ``)
  }
  if (botIsSubject && (/^you.?r?/i.test(args[0] + args[1])) && args.length > 1) {
    return reply(`no, ${args.join(' ')}!`)
  }
  if (botIsSubject && /a?live|a?wake|a?sleep/i.test(content)) {
    return reply(`sometimes I sleep, to wake me up, visit <https://codibot.glitch.me/>`)
  }
  if (botIsSubject && /where/i.test(content) && /edit|code/i.test(content)) {
    return reply(`you can read my internals at <https://glitch.com/edit/#!/codibot>`)
  }
  if (botIsSubject && /\?|!$/.test(content)) {
    return reply(`yes?`)
  }
}

module.exports = answer