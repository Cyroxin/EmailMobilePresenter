const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get tags
router.get("/", (req, res, next) => {
    var sql = `SELECT tags.tag FROM tags GROUP BY tags.tag`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// Add tag
router.post("/", (req, res, next) => {
    var errors = []
    if (!req.body.tag) {
        errors.push("No tag specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        tag: req.body.tag,
    }
    var sql = `INSERT INTO tags (tag) VALUES (?)`
    var params = [data.tag]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

module.exports = router