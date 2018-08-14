var db = require("../models");
// Use Handlebars to render the main index.html page with the todos in it.

module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log("got here");
        db.Burger.findAll({
            include: [{model: db.User}]
        }).then(function (data) {
            console.log("###########", data);
            var hbsObj = {
                burgers: data
            };
            console.log("HBSOBJ USER: ", hbsObj.burgers[0].Users[0].dataValues.name);
            console.log("OBJECT: ", hbsObj);
            res.render("index", hbsObj);
        });
    });
    app.get("/api/burgers/", function (req, res) {
        console.log("got here");
        db.Burger.findAll({
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/burgers/menu", function (req, res) {
        console.log("got here");
        db.Burger.findAll({
            where: {
                devoured: false
            },
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/burgers/devoured", function (req, res) {
        console.log("got here");
        db.Burger.findAll({
            where: {
                devoured: true
            },
            include: [{model: db.User}]
        }).then(function (data) {
            res.json(data);
        });
    });

    // POST route for saving a new todo. We can create a todo using the data on req.body
    app.post("/api/burgers", function (req, res) {
        console.log("FULL REQ: ", req);
        console.log("REQ BODY: ", req.body);
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: false
        }).then(function (result) {
            res.json(result);
        })
    });

    app.put("/api/burgers/:id", function (req, res) {
        console.log(req.body.user);
        if (req.body.user) {
            db.User.create({
                name: req.body.user,
                BurgerId: req.body.id
            }).then(function (dbCustomer) {
                return db.Burger.update({
                    devoured: req.body.devoured
                }, {
                        where: {
                            id: req.params.id,
                        }
                    }).then(function (result) {
                        res.json(result);
                    })
            })
        }

    });

    app.delete("/api/burgers/:id", function (req, res) {
        // console.log(req.)
        console.log(req.body);
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
}
