'use strict';

var express = require('express'),
app 		= express(),
bodyParser 	= require('body-parser'),
fs			= require('fs'),
_			= require('underscore'),
config	    = require('./config/config')['test'],
utils		= require('./utils/utils.js');

//request body parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
extended: true
}));

app.use(bodyParser.json());

var process_ 	= function(o) {
	var data = o;
	_.each(data, function(resource, index) {
		data = utils.randomTweak(resource.properties, config);
	});

	return JSON.stringify(o);
};

app.get('/', function (req, res) {
  res.send('Azure Dataset Simulator with random breaktweak....')
})

app.get('/api', function (req, res) {
	

	try {
		var file 	 = 'templates/'+(req.query.file || 'twe')+'.json';
		var result   = fs.readFileSync(file, {encoding: 'utf-8'});

		var object       = JSON.parse(result);
		if(!req.query.original) {
			object.resources = JSON.parse(process_(object.resources));
		} else {
			utils.logme("Load original Resource group template: "+file, config);
		}

		res.header('Content-Type','text/json').send(object);
	} catch(e) {
		utils.logme('Error reading file '+file , config);
		res.header('Content-Type','text/json').send('Error reading file '+file);
	}
	
})


app.listen(config.port_no, function () {
  utils.logme('Example app listening on port '+config.port_no+'!', config)
})