const fs = require('fs');
const uuid = require('uuid/v1');
const path = require('path');

var dbUrl = path.join(__dirname, '/db.json');

var dbData;

var db = {
	initDB: function(){
		if (fs.existsSync(dbUrl)){
			var s = fs.readFileSync(dbUrl);
			dbData = JSON.parse(s);
			console.log('db.json 文件内容：', JSON.stringify(dbData, null, 4));
		} else {
			dbData = {};
		}
	},
	saveDB: function(){
		fs.writeFileSync(dbUrl, JSON.stringify(dbData));
	}
};

db.initDB();

var methods = {
	type: {
		server: 'server'
	},
	save: function(type, data){
		var s = dbData[type] = dbData[type] || {};
		var id = data.id = data.id || uuid();
		s[id] = data;
		db.saveDB();
		console.log('db save:', JSON.stringify(data, null, 4));
	},
	remove: function(type, id){
		var s = dbData[type] = dbData[type] || {};

		console.log('db delete:', JSON.stringify(s[id], null, 4));

		delete s[id];
		db.saveDB();
	},
	findAll: function(type){
		var l = dbData[type];
		if (!l) return [];
		
		var r = [];
		for(var i in l){
			r.push(l[i]);
		}
		return r;
	},
	findById: function(type, id){
		var l = dbData[type];
		if (!l) return null;
		
		return l[id];
	}
};

module.exports = methods;