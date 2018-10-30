const bot = require("./bot");
const express = require("express");
const prepare_controller = require("./controller");

const app = express();

const errToJson = res => ({ message, stack }) =>
  res
    .status(500)
    .send({ status: 0, error: message, stack: stack.split("\n").slice(5) });

const run_request_promise = fnThatReturnsPromise => (req, res) =>
  fnThatReturnsPromise({ ...req.params, ...req.query })
    .then(data => res.send({ status: 1, data }))
    .catch(errToJson(res));

prepare_controller().then(
  ({
    random,
    team_by_id,
    user_list,
    user_by_id,
    keys_total,
    event_list,
    resource_list,
    tag_list,
    attendance_list
  }) => {
    app.get("/random/:type?", run_request_promise(random));
    app.get("/resources/:tag?", run_request_promise(resource_list));
    app.get("/tag/:tag?", run_request_promise(tag_list));
    app.get("/user/team/:id", run_request_promise(team_by_id));
    app.get("/user/all/:page?", run_request_promise(user_list));
    app.get("/user/:id", run_request_promise(user_by_id));
    app.get("/event/:page?", run_request_promise(event_list));
    app.get("/keys", run_request_promise(keys_total));
    app.get("/attendance/:start?/:end?", run_request_promise(attendance_list));
    app.get("/", (req, res) => res.send("hello"));
    app.get("/bot", (req, res, next) => {
      if (req.query && req.query.key) {
        const BOT_TOKEN = req.query.key;
        bot(BOT_TOKEN)
          .then(_ => res.send("bot on"))
          .catch(err => next(err));
      } else {
        next();
      }
    });
    app.listen(8080, () => console.log("listening on 8080"));
  }
);
