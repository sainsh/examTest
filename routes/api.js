var express = require('express');
var router = express.Router();
var db = require('../model/db')
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

router.get('/ship/:id', async (req, res, next) => {
    
    var ships = await db.getShip(req.path.slice(6))
    if(ships.length <= 0){
        ships = "intet skib fundet"
    }

    res.send(ships);
})
router.get('/ship/', async (req, res, next) => {

    var ships = await db.getShips();

    res.send(ships);
})

router.post('/login/', async (req,res,next) =>{
    var username = req.body.username
    var psw = md5.update(req.body.psw).digest('hex');
    if(db.login(username, psw)){
        var ships = await db.getShips();

        res.render('ships', {title: "test Exam", ships: ships, uname: username})
    }

})
router.post('/ship/', async (req,res,next) =>{
    var result = await db.insertShip(req.body);
    res.send(result)
})


module.exports = router;
