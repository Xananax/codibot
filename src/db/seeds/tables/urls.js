const resource = [
  [
    "//alistapart.com",
    "general web tech & project management",
    "project-management css performance blog"
  ],
  [
    "//tympanus.net/codrops",
    "design & user interfaces, with examples",
    "UI UX css js front-end starter snippets design"
  ],
  [
    "//www.smashingmagazine.com",
    "everything web related",
    "UI UX css front-end trends php js starter tutorials magazine"
  ],
  ["//survivejs.com", "latest javascript trends", "js react vue trends"],
  [
    "//dev.to",
    "community of developpers writing blog posts about diverse subjects",
    "js react vue trends tutorials blog"
  ],
  [
    "//medium.freecodecamp.org",
    "FreeCodeCamp's consistently good articles on Medium",
    "js php html css tutorials blog"
  ],
  [
    "//css-tricks.com",
    "Short, practical examples about specific CSS features",
    "css snippets UI front-end"
  ],
  [
    "//lawsofux.com",
    "A good reminder of the main UI laws",
    "UX front-end design"
  ],
  [
    "//hackernoon.com",
    "A blog with articles, often relatively advanced, about things related to coding",
    "crypto, js, css, html, node, databases, project-management"
  ],
  [
    "//hnpwa.com",
    "An example of a hacker news style website, built with all the different technologies",
    "js snippets sources"
  ],
  [
    "//drawings.jvns.ca",
    "Linux concepts explained with hand-written words",
    "linux unix eli5"
  ],
  [
    "//www.gridtoflex.com",
    "A guide for popular layouts using Grid, which can fallback to Flex",
    "css snippets flex grid"
  ],
  [
    "//atomiks.github.io/30-seconds-of-css",
    "short, useful css snippets to use immediately",
    "css snippets"
  ],
  ["//flexboxfroggy.com", "a tutorial to get flexbox", "css flex"],
  [
    "//permissions-calculator.org",
    "quickly understand unix-style perms",
    "unix linux"
  ],
  [
    "//www.youtube.com/user/DrBartosz/videos",
    "Bartosz Milewski explains category theory",
    "functional-programming category-theory video"
  ],
  [
    "//www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q",
    "Fun Fun Function, a cool show that talks about a lot of things, often Javascript",
    "js css html video"
  ],
  [
    "//www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ",
    "FreeCodeCamp's consistently excellent videos",
    "js css html video"
  ],
  ["//cssgrid.io", "A tutorial by Wes Bos about CSS Grid", "css grid"],
  ["//cssgridgarden.com", "A game to learn CSS Grid", "css grid"],
  [
    "//menadevs.com",
    "The community of MENA developers. Find jobs, news, and network with people",
    "jobs mena community slack"
  ],
  [
    "//www.shortcutfoo.com",
    "A game to learn shortcuts",
    "unix linux vim shortcuts"
  ],
  [
    "//www.reddit.com/r/javascript",
    "the reddit community for Javascript",
    "js reddit"
  ],
  [
    "//www.reddit.com/r/node",
    "the reddit community for Node.js",
    "js node community reddit"
  ],
  [
    "//www.reddit.com/r/reactjs",
    "the reddit community for React js",
    "js node react community reddit"
  ],
  [
    "//discord.gg/3Ss5ryR",
    "the Discord community for React, Reactiflux (very welcoming of newbies)",
    "js react community discord"
  ],
  [
    "//discord.gg/zQCmjC4",
    'A Discord community, ".Developers", tackling all languages and friendly',
    "programming discord community"
  ],
  [
    "//discordapp.com/invite/9zT7NHP",
    'A Discord community "Programming Discussions", welcoming to newbies',
    "programming discord community"
  ],
  [
    "//discord.gg/0TYNJfCU4De7YIk8",
    "The Discord GameDev League, one of the biggest meeting point of game devs",
    "gamedev discord community"
  ],
  [
    "//discord.gg/gdn",
    "the Discord Game Dev Network, a bit less serious than GameDev League, but almost as popular",
    "gamedev discord community"
  ],
  [
    "//discord.gg/programming",
    'A Discord community, "The Programmer\'s hangout", relatively geared towards web',
    "programming discord community"
  ],
  [
    "//discord.gg/DZgQc8y",
    "The Discord Godot Engine, an awesome community for the game engine, managed by @xananax :sunglasses:",
    "gamedev discord community"
  ],
  [
    "//jsfordesigners.davemart.in",
    "A tutorial to learn Javascript, taught in a very direct manner, directed at designers",
    "js starter"
  ],
  [
    "//github.com/cjbarber/ToolsOfTheTrade",
    "a list of a lot of the services professionals use",
    "services providers servers"
  ],
  ["//www.idontnix.net/tech/linmyth.html", "Linux Myths", "satirical"],
  ["//www.sql-tutorial.ru", "interactive SQL textbook", "sql database"],
  [
    "//sol.gfxile.net/galaxql.html",
    "interactive SQL tutorial using a star dataset",
    "sql database"
  ],
  [
    "//schemaverse.com",
    "space based strategy game where you fight with SQL queries",
    "sql database game"
  ],
  [
    "//www.postgresql.org/docs/9.2/static/sql.html",
    "the postgres documentation, as good as any book",
    "sql database"
  ],
  [
    "//mega.nz/#F!TU5UFKrD!jQ4UmdP_zvEZLB9q_tyfcA",
    "a little bunch of books about various subjects",
    "books xananax epub"
  ],
  [
    "//codecombat.com",
    "levels to solve with code, with progressing difficulty",
    "programming game"
  ],
  [
    "//www.codingame.com/start",
    "different game challenges to overcome",
    "programming game"
  ],
  [
    "//challenge.synacor.com",
    "a full game with story, in the browser, solved by code",
    "programming game"
  ],
  [
    "//www.nand2tetris.org",
    "how to build a full computer from scratch",
    "programming, game"
  ],
  [
    "//dbdiagram.io/",
    "online database editing and modelling",
    "database sql model"
  ],
  [
    "//www.vertabelo.com/",
    "online database editing and modelling",
    "database sql model"
  ],
  [
    "//warriorjs.com",
    "A maze game where you need to control a warrior with code",
    "programming game javascript"
  ],
  [
    "//flexboxzombies.com/p/flexbox-zombies",
    "a game to learn flexbox",
    "css programming game"
  ]
]
  .filter(Boolean)
  .map(([resource_url, resource_description, tags]) => ({
    resource_id: resource_url.replace(/^https?:\/\/|^\/\//),
    resource_url,
    resource_origin: get_resource_origin(resource_url, tags),
    resource_description,
    tags
  }));

const get_resource_origin = (url, tags) => {
  if (/reddit\.com/.test(url)) {
    return "reddit";
  }
  if (/discordapp\.com|discord\.gg/.test(url)) {
    return "discord";
  }
  return "";
};

const tag = resource
  .map(({ tags }) => tags) // extract tags
  .join(" ") // make one string with all the tags (some tags will be repeated)
  .split(" ") // split on spaces
  .filter((value, index, self) => self.indexOf(value) === index) // remove repeated values
  .map(tag_id => ({ tag_id, tag_name: tag_id }));

const tag_resource = resource.reduce((arr, resource) => {
  const { resource_id, tags } = resource;
  const rows = tags.split(" ").map(tag_id => ({ tag_id, resource_id }));
  delete resource.tags;
  return [...arr, ...rows];
}, []);

module.exports = { resource, tag, tag_resource };
