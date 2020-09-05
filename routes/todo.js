const router = require("express").Router();
const db = require("../models");


router.route("/reactTodos").post((req, res) => {
    // Use a regular expression to search titles for req.query.q
    // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
    console.log(req.body)
    db.Todo.create(
        req.body
    )
        .then(todo => res.json(todo))
        .catch(err => { console.log(err); res.status(422).end() });
});

module.exports = router;