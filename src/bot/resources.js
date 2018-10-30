const resources = [
  [
    "https://alistapart.com",
    "general web tech & project management",
    "project-management css performance blog"
  ],
  [
    "https://tympanus.net/codrops",
    "design & user interfaces, with examples",
    "UI UX css js front-end starter snippets design"
  ],
  [
    "https://www.smashingmagazine.com",
    "everything web related",
    "UI UX css front-end trends php js starter tutorials magazine"
  ],
  ["https://survivejs.com", "latest javascript trends", "js react vue trends"],
  [
    "https://dev.to/",
    "community of developpers writing blog posts about diverse subjects",
    "js react vue trends tutorials blog"
  ],
  [
    "https://medium.freecodecamp.org/",
    "FreeCodeCamp's consistently good articles on Medium",
    "js php html css tutorials blog"
  ],
  [
    "https://css-tricks.com/",
    "Short, practical examples about specific CSS features",
    "css snippets UI front-end"
  ],
  [
    "https://lawsofux.com/",
    "A good reminder of the main UI laws",
    "UX front-end design"
  ],
  [
    "https://hackernoon.com/",
    "A blog with articles, often relatively advanced, about things related to coding",
    "crypto, js, css, html, node, databases, project-management"
  ],
  [
    "https://hnpwa.com/",
    "An example of a hacker news style website, built with all the different technologies",
    "js snippets sources"
  ],
  [
    "https://drawings.jvns.ca/",
    "Linux concepts explained with hand-written words",
    "linux unix eli5"
  ],
  [
    "https://www.gridtoflex.com/",
    "A guide for popular layouts using Grid, which can fallback to Flex",
    "css snippets flex grid"
  ],
  [
    "https://atomiks.github.io/30-seconds-of-css/",
    "short, useful css snippets to use immediately",
    "css snippets"
  ],
  ["https://flexboxfroggy.com/", "a tutorial to get flexbox", "css flex"],
  [
    "http://permissions-calculator.org/",
    "quickly understand unix-style perms",
    "unix linux"
  ],
  [
    "https://www.youtube.com/user/DrBartosz/videos",
    "Bartosz Milewski explains category theory",
    "functional-programming category-theory video"
  ],
  [
    "https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q",
    "Fun Fun Function, a cool show that talks about a lot of things, often Javascript",
    "js css html video"
  ],
  [
    "https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ",
    "FreeCodeCamp's consistently excellent videos",
    "js css html video"
  ],
  ["https://cssgrid.io/", "A tutorial by Wes Bos about CSS Grid", "css grid"],
  ["https://cssgridgarden.com/", "A game to learn CSS Grid", "css grid"],
  [
    "https://menadevs.com/",
    "The community of MENA developers. Find jobs, news, and network with people",
    "jobs mena community slack"
  ],
  [
    "https://www.shortcutfoo.com/",
    "A game to learn shortcuts",
    "unix linux vim shortcuts"
  ],
  [
    "https://www.reddit.com/r/javascript/",
    "the reddit community for Javascript",
    "js reddit"
  ],
  [
    "https://www.reddit.com/r/node/",
    "the reddit community for Node.js",
    "js node community reddit"
  ],
  [
    "https://www.reddit.com/r/reactjs/",
    "the reddit community for React js",
    "js node react community reddit"
  ],
  [
    "https://discord.gg/3Ss5ryR",
    "the Discord community for React, Reactiflux (very welcoming of newbies)",
    "js react community discord"
  ],
  [
    "https://discord.gg/zQCmjC4",
    'A Discord community, ".Developers", tackling all languages and friendly',
    "programming discord community"
  ],
  [
    "https://discordapp.com/invite/9zT7NHP",
    'A Discord community "Programming Discussions", welcoming to newbies',
    "programming discord community"
  ],
  [
    "https://discord.gg/0TYNJfCU4De7YIk8",
    "The Discord GameDev League, one of the biggest meeting point of game devs",
    "gamedev discord community"
  ],
  [
    "https://discord.gg/gdn",
    "the Discord Game Dev Network, a bit less serious than GameDev League, but almost as popular",
    "gamedev discord community"
  ],
  [
    "https://discord.gg/programming",
    'A Discord community, "The Programmer\'s hangout", relatively geared towards web',
    "programming discord community"
  ],
  [
    "https://discord.gg/DZgQc8y",
    "The Discord Godot Engine, an awesome community for the game engine, managed by @xananax :sunglasses:",
    "gamedev discord community"
  ],
  [
    "http://jsfordesigners.davemart.in/",
    "A tutorial to learn Javascript, taught in a very direct manner, directed at designers",
    "js starter"
  ],
  [
    "https://github.com/cjbarber/ToolsOfTheTrade",
    "a list of a lot of the services professionals use",
    "services providers servers"
  ],
  ["https://www.idontnix.net/tech/linmyth.html", "Linux Myths", "satirical"],
  ["http://www.sql-tutorial.ru/", "interactive SQL textbook", "sql database"],
  [
    "http://sol.gfxile.net/galaxql.html",
    "interactive SQL tutorial using a star dataset",
    "sql database"
  ],
  [
    "https://schemaverse.com/",
    "space based strategy game where you fight with SQL queries",
    "sql database game"
  ],
  [
    "https://www.postgresql.org/docs/9.2/static/sql.html",
    "the postgres documentation, as good as any book",
    "sql database"
  ],
  [
    "https://mega.nz/#F!TU5UFKrD!jQ4UmdP_zvEZLB9q_tyfcA",
    "a little bunch of books about various subjects",
    "books xananax epub"
  ],
  [
    "https://codecombat.com/",
    "levels to solve with code, with progressing difficulty",
    "programming, game"
  ],
  [
    "https://www.codingame.com/start",
    "different game challenges to overcome",
    "programming, game"
  ],
  [
    "https://challenge.synacor.com/",
    "a full game with story, in the browser, solved by code",
    "programming, game"
  ],
  [
    "https://www.nand2tetris.org/",
    "how to build a full computer from scratch",
    "programming, game"
  ]
]
  .filter(Boolean)
  .map(([url, desc, tags]) => ({ url, desc, tags }));

const tags = resources
  .map(({ tags }) => tags) // extract tags
  .join(" ") // make one string with all the tags (some tags will be repeated)
  .split(" ") // split on spaces
  .filter((value, index, self) => self.indexOf(value) === index) // remove repeated values
  .map(n => "`" + n + "`") // add `` around each tag
  .join(" "); // join as one string

const findOne = (source, needle) => {
  const r = new RegExp(needle);
  return source.filter(({ tags }) => r.test(tags));
};

const findAnd = (...needles) => {
  let i = needles.length - 1;
  let matches = resources.slice();
  while (i >= 0) {
    matches = findOne(matches, needles[i--]);
  }
  return matches;
};

const findOr = (...needles) => {
  let i = needles.length - 1;
  let matches = [];
  while (i >= 0) {
    matches = [...matches, ...findOne(resources, needles[i--])];
  }
  return matches;
};

const getCommand = args => {
  if (args[0] === "tags" || !args[0]) {
    return tags;
  }
  const matches = findAnd(args);
  if (!matches.length) {
    return "nothing found for the combination `" + args.join(",") + "`";
  }
  return matches.map(({ url, desc }) => `- <${url}> → ${desc}\n`).join("");
};

module.exports = getCommand;
