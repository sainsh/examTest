var express = require('express');
var router = express.Router();
var db = require('../model/db')


/* GET home page. */
router.get('/', async(req, res, next) => {
  var ships = await db.getShips()
  res.render('ships', {title: "Test Exam", ships: ships });
});
router.get('/ships/', async (req, res, next) => {
  var ships = await db.getShips()
  res.render('ships', {title:"Test Exam", ships: ships })
})

module.exports = router;
