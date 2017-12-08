'use strict';
var _			= require('underscore');

var eh_helper   = {
	random_ 	: function(from, to, randomBool) {
		return (randomBool) ? (Math.random() >= 0.5) : (Math.floor(Math.random() * to-1) + from);
	},
	logme 		: function(text, config) {
		if(config.log_) {
			console.log("LOGGING: "+text);
		}		
	},
	randomTweak : function (props, config) {
		var i_ = 0;
		var keys 	= _.keys(props);

		do {
			var pickone = eh_helper.random_(1, keys.length);
			if(typeof props[keys[pickone]] == 'object') { 
				if(!_.isArray(props)) {
					if(eh_helper.random_(2, 8) == 4) {
						delete props[keys[pickone]];
						eh_helper.logme('Deleting object: '+keys[pickone], config);
					} else {
						props[keys[pickone]] = eh_helper.randomTweak(props[keys[pickone]], config);
						eh_helper.logme('Go next level: '+keys[pickone], config);
					}					
				} else if(config.arr_ && eh_helper.random_(false, false, true) && props.length > 1){
					props = [];
					eh_helper.logme('Empty array', config);
				}				
			} else if (typeof props[keys[pickone]] == 'string' || typeof props[keys[pickone]] == 'number') {

				if(config.do_ == 'D') {
					delete props[keys[pickone]];
					eh_helper.logme('Deleting object: '+keys[pickone], config);
				} else {
					props[keys[pickone]] = (typeof props[keys[pickone]] == 'string') ? config.do_ : (999000+eh_helper.random_(300,999));
					eh_helper.logme('override value: '+keys[pickone], config);
				}
			}	
			i_++;	
		} while(i_ <= config.density);
		return props;
	}
}

module.exports = eh_helper;