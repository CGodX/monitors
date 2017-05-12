var express = require('express');
var request = require('request');
var db = require('./util/db');
var router = express.Router();

/* GET home page. */
router.all('/save', function (req, res) {
	db.save(db.type.server, req.body);
	res.json(req.body);
});

router.all('/del/:id', function (req, res) {
	db.remove(db.type.server, req.params.id);
	res.json(req.body);
});

router.all('/list', function (req, res) {
	res.json(db.findAll(db.type.server));
});

router.all('/request/*', function (req, res) {
	var url = req.params[0];
	if (!(/^http/.test(url))){
		url = 'http://' + url;
	}

	request({
		url: url
	}, function(err, resp){
		res.json(resp);
	});
});

module.exports = router;
